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

  it('menampilkan skenario ringkas dan membuka alasan lengkap hanya saat diminta', async () => {
    const user = userEvent.setup()
    renderFlow()

    expect(screen.getByText('Nama toko yang muncul berbeda dari nama tokomu. Apa yang kamu lakukan?')).toBeInTheDocument()
    expect(screen.getByText('Lepas QR itu dan laporkan.')).toBeInTheDocument()
    expect(screen.queryByText(/uang pembeli bisa masuk ke rekening orang itu/)).not.toBeInTheDocument()

    await user.click(screen.getByText('Lepas QR itu dan laporkan.'))
    expect(screen.getByText('QR statis palsu bisa mengalihkan uang ke rekening pelaku.')).toBeInTheDocument()
    expect(screen.queryByText(/uang pembeli bisa masuk ke rekening orang itu/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Kenapa?' }))
    expect(screen.getByText(/uang pembeli bisa masuk ke rekening orang itu/)).toBeInTheDocument()
  })

  it('menampilkan feedback lalu skor akhir 3/3 saat semua jawaban benar, dan mengirim analytics', async () => {
    const user = userEvent.setup()
    renderFlow()

    await user.click(screen.getByText('Lepas QR itu dan laporkan.'))
    expect(screen.getByText('Tepat sekali!')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Tunggu notifikasi di HP-mu.'))
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Cek nominal di layarmu.'))
    await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))

    expect(screen.getByText('3/3 jawaban tepat di percobaan pertama')).toBeInTheDocument()
    expect(screen.getByText(/Mantap, semua jawabanmu tepat/)).toBeInTheDocument()
    expect(submitSkenarioAttempt).toHaveBeenCalledWith({ correctCount: 3, totalCount: 3 })
  })

  it('menampilkan pesan belum sempurna dan bisa diulang', async () => {
    const user = userEvent.setup()
    renderFlow()

    await user.click(screen.getByText('Lanjutkan saja, mungkin salah lihat.'))
    expect(screen.getByText('Belum tepat')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Berikan barang karena ada screenshot.'))
    await user.click(screen.getByRole('button', { name: 'Skenario Berikutnya' }))

    await user.click(screen.getByText('Percaya nominal yang disebut pembeli.'))
    await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))

    expect(screen.getByText('0/3 jawaban tepat di percobaan pertama')).toBeInTheDocument()
    expect(screen.getByText(/Terus diingat ya/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '↻ Ulangi' }))
    expect(screen.getByTestId('skenario-panel')).toBeInTheDocument()
  })
})
