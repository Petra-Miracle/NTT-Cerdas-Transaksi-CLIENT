import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { playAww, playYey } from '../../utils/gameSound'
import ProdukLokalFlow from './ProdukLokalFlow'

vi.mock('../../utils/gameSound', () => ({
  playYey: vi.fn(),
  playAww: vi.fn(),
}))

function renderFlow() {
  return render(
    <MemoryRouter>
      <ProdukLokalFlow />
    </MemoryRouter>,
  )
}

describe('ProdukLokalFlow interaktif', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('memberi poin + yey saat tepat, bonus streak setelah 2 beruntun', async () => {
    const user = userEvent.setup()
    renderFlow()

    // Kartu 1 Tenun Ikat Sumba (lokal) → opsi pertama tepat.
    await user.click(screen.getByText('✅ Lokal / Buatan Indonesia'))
    expect(playYey).toHaveBeenCalledOnce()
    expect(screen.getByText(/Tebakan tepat! \+100 poin/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Kartu Berikutnya' }))

    // Kartu 2 Kopi Bajawa (lokal) → tepat lagi: streak x2 + bonus.
    await user.click(screen.getByText('✅ Lokal / Buatan Indonesia'))
    expect(screen.getByText(/Beruntun/)).toBeInTheDocument()
    expect(screen.getByText(/Tebakan tepat! \+125 poin/)).toBeInTheDocument()
  })

  it('mereset streak + bunyi ow-ow saat tebakan meleset', async () => {
    const user = userEvent.setup()
    renderFlow()

    await user.click(screen.getByText('❌ Produk Impor'))
    expect(playAww).toHaveBeenCalledOnce()
    expect(playYey).not.toHaveBeenCalled()
    expect(screen.getByText('Belum tepat')).toBeInTheDocument()
    expect(screen.queryByText(/Beruntun/)).not.toBeInTheDocument()
  })

  it('menampilkan pembahasan tiap kartu di layar hasil seperti kuis CBP', async () => {
    const user = userEvent.setup()
    renderFlow()

    // Jawab semua: kartu 1-5 & 8 lokal, kartu 6-7 impor.
    const jawaban = [true, true, true, true, true, false, false, true]
    for (let i = 0; i < jawaban.length; i += 1) {
      await user.click(screen.getByText(jawaban[i] ? '✅ Lokal / Buatan Indonesia' : '❌ Produk Impor'))
      await user.click(screen.getByRole('button', { name: i === jawaban.length - 1 ? 'Lihat hasil' : 'Kartu Berikutnya' }))
    }

    expect(screen.getByText('8/8 tebakan tepat')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Lihat pembahasan tiap kartu' }))
    expect(screen.getByText('Kartu 1: Tenun Ikat Sumba')).toBeInTheDocument()
    expect(screen.getByText(/mendukung ekonomi keluarga penenun/)).toBeInTheDocument()
    expect(screen.getByText('Kartu 8: Garam Krosok NTT')).toBeInTheDocument()
  })
})
