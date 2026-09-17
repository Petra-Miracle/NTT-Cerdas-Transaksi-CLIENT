import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitKuisAttempt } from '../../services/api'
import { KUIS_LIST } from './kuisContent'
import KuisModal from './KuisModal'

vi.mock('../../services/api', () => ({
  submitKuisAttempt: vi.fn(),
}))

async function answerAllCorrectly(user) {
  for (let i = 0; i < KUIS_LIST.length; i += 1) {
    const soal = KUIS_LIST[i]
    await user.click(screen.getByText(soal.opsi[soal.benar]))
    const isLast = i === KUIS_LIST.length - 1
    await user.click(screen.getByRole('button', { name: isLast ? 'Lihat skor' : 'Soal Berikutnya' }))
  }
}

describe('KuisModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tidak render apa pun saat isOpen false', () => {
    render(<KuisModal isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByText('Kuis CBP Rupiah')).not.toBeInTheDocument()
  })

  it('menampilkan skor 10/10 · 100% paham dan mengirim analytics saat semua benar', async () => {
    const user = userEvent.setup()
    render(<KuisModal isOpen onClose={vi.fn()} />)

    await answerAllCorrectly(user)

    expect(screen.getByText('Skor: 10/10 · 100% paham')).toBeInTheDocument()
    expect(screen.getByText(/Keren!/)).toBeInTheDocument()
    expect(submitKuisAttempt).toHaveBeenCalledWith({ correctCount: 10, totalCount: 10 })
  })

  it('mereset progres ke soal pertama saat modal ditutup (mis. tombol tutup)', async () => {
    const user = userEvent.setup()
    render(<KuisModal isOpen onClose={vi.fn()} />)

    await user.click(screen.getByText(KUIS_LIST[0].opsi[KUIS_LIST[0].benar]))
    await user.click(screen.getByRole('button', { name: 'Soal Berikutnya' }))
    expect(screen.getByText('Soal 2 dari 10')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tutup' }))

    expect(screen.getByText('Soal 1 dari 10')).toBeInTheDocument()
  })
})
