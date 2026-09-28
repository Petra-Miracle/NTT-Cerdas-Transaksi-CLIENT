import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitProdukLokalAttempt } from '../../services/api'
import { KARTU_LIST } from './produkLokalContent'
import ProdukLokalFlow from './ProdukLokalFlow'

vi.mock('../../services/api', () => ({
  submitProdukLokalAttempt: vi.fn(),
}))

function renderFlow() {
  return render(
    <MemoryRouter>
      <ProdukLokalFlow />
    </MemoryRouter>,
  )
}

async function answerAllCorrectly(user) {
  for (let i = 0; i < KARTU_LIST.length; i += 1) {
    const kartu = KARTU_LIST[i]
    const label = kartu.lokal ? '✅ Lokal / Buatan Indonesia' : '❌ Produk Impor'
    await user.click(screen.getByText(label))
    const isLast = i === KARTU_LIST.length - 1
    await user.click(screen.getByRole('button', { name: isLast ? 'Lihat hasil' : 'Kartu Berikutnya' }))
  }
}

describe('ProdukLokalFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('menampilkan skor sempurna dan mengirim analytics saat semua tebakan benar', async () => {
    const user = userEvent.setup()
    renderFlow()

    await answerAllCorrectly(user)

    expect(screen.getByText(`${KARTU_LIST.length}/${KARTU_LIST.length} tebakan tepat`)).toBeInTheDocument()
    expect(submitProdukLokalAttempt).toHaveBeenCalledWith({
      correctCount: KARTU_LIST.length,
      totalCount: KARTU_LIST.length,
    })
  })

  it('menampilkan feedback salah dan bisa diulang saat tebakan meleset', async () => {
    const user = userEvent.setup()
    renderFlow()

    const kartuPertama = KARTU_LIST[0]
    const labelSalah = kartuPertama.lokal ? '❌ Produk Impor' : '✅ Lokal / Buatan Indonesia'
    await user.click(screen.getByText(labelSalah))
    expect(screen.getByText('Belum tepat')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Kartu Berikutnya' }))

    for (let i = 1; i < KARTU_LIST.length; i += 1) {
      const kartu = KARTU_LIST[i]
      const label = kartu.lokal ? '✅ Lokal / Buatan Indonesia' : '❌ Produk Impor'
      await user.click(screen.getByText(label))
      const isLast = i === KARTU_LIST.length - 1
      await user.click(screen.getByRole('button', { name: isLast ? 'Lihat hasil' : 'Kartu Berikutnya' }))
    }

    expect(screen.getByText(`${KARTU_LIST.length - 1}/${KARTU_LIST.length} tebakan tepat`)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '↻ Ulangi' }))
    expect(screen.getByTestId('produklokal-panel')).toBeInTheDocument()
  })
})
