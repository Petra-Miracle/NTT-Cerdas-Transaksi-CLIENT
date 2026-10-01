import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitKuisAttempt } from '../../services/api'
import { KUIS_LIST } from './kuisContent'
import KuisFlow from './KuisFlow'

vi.mock('../../services/api', () => ({
  submitKuisAttempt: vi.fn(),
}))

function renderFlow() {
  return render(
    <MemoryRouter>
      <KuisFlow />
    </MemoryRouter>,
  )
}

async function answerAllCorrectly(user) {
  for (let i = 0; i < KUIS_LIST.length; i += 1) {
    const soal = KUIS_LIST[i]
    await user.click(screen.getByText(soal.opsi[soal.benar]))
    const isLast = i === KUIS_LIST.length - 1
    await user.click(screen.getByRole('button', { name: isLast ? 'Lihat skor' : 'Soal Berikutnya' }))
  }
}

describe('KuisFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('menampilkan soal pertama dan progres', () => {
    renderFlow()

    expect(screen.getByText('Soal 1 dari 10')).toBeInTheDocument()
    expect(screen.getByText(KUIS_LIST[0].soal)).toBeInTheDocument()
    expect(screen.getByText(KUIS_LIST[0].opsi[KUIS_LIST[0].benar])).toBeInTheDocument()
  })

  it('menampilkan skor 10/10 · 100% paham dan mengirim analytics saat semua benar', async () => {
    const user = userEvent.setup()
    renderFlow()

    await answerAllCorrectly(user)

    expect(screen.getByText('Skor: 10/10 · 100% paham')).toBeInTheDocument()
    expect(screen.getByText(/Keren!/)).toBeInTheDocument()
    expect(submitKuisAttempt).toHaveBeenCalledWith({ correctCount: 10, totalCount: 10 })
  })

  it('tombol Ulangi mengembalikan ke soal pertama', async () => {
    const user = userEvent.setup()
    renderFlow()

    await answerAllCorrectly(user)
    expect(screen.getByText('Skor: 10/10 · 100% paham')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '↻ Ulangi' }))

    expect(screen.getByText('Soal 1 dari 10')).toBeInTheDocument()
  })
})
