import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitSkenarioAttempt } from '../../services/api'
import KeamananFlow from './KeamananFlow'

vi.mock('../../services/api', () => ({
  submitSkenarioAttempt: vi.fn(),
}))

function renderFlow() {
  return render(
    <MemoryRouter>
      <KeamananFlow />
    </MemoryRouter>,
  )
}

describe('KeamananFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('menampilkan feedback lalu skor akhir 3/3 saat semua jawaban benar, dan mengirim analytics', async () => {
    const user = userEvent.setup()
    renderFlow()

    await user.click(
      screen.getByText(
        'Cek sendiri nama yang muncul saat QR dipindai. Kalau memang beda dari nama tokomu, langsung lepas stiker QR itu dan laporkan.',
      ),
    )
    expect(screen.getByText('Tepat sekali!')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(
      screen.getByText(
        'Tunggu sampai notifikasi transaksi resmi benar-benar muncul di HP atau rekeningmu sendiri, baru serahkan barangnya.',
      ),
    )
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(
      screen.getByText(
        'Selalu cek nominal yang tertera di layar HP/EDC milikmu sendiri sebelum menyerahkan barang — jangan hanya percaya sebutan lisan pembeli.',
      ),
    )
    await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))

    expect(screen.getByText('3/3 jawaban tepat di percobaan pertama')).toBeInTheDocument()
    expect(screen.getByText(/Mantap, semua jawabanmu tepat/)).toBeInTheDocument()
    expect(submitSkenarioAttempt).toHaveBeenCalledWith({ correctCount: 3, totalCount: 3 })
  })

  it('menampilkan pesan belum sempurna dan bisa diulang', async () => {
    const user = userEvent.setup()
    renderFlow()

    await user.click(screen.getByText('Suruh dia lanjut transfer saja, mungkin cuma salah lihat.'))
    expect(screen.getByText('Belum tepat')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Percaya saja karena sudah lihat buktinya di layar HP pembeli, langsung kasih barangnya.'))
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Anggap wajar saja, karena QRIS dinamis biasanya otomatis benar nominalnya.'))
    await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))

    expect(screen.getByText('0/3 jawaban tepat di percobaan pertama')).toBeInTheDocument()
    expect(screen.getByText(/Terus diingat ya/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '↻ Ulangi' }))
    expect(screen.getByTestId('skenario-panel')).toBeInTheDocument()
  })
})
