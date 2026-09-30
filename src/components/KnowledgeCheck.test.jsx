import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitPemahamanAttempt } from '../services/api'
import KnowledgeCheck from './KnowledgeCheck'

vi.mock('../services/api', () => ({
  submitPemahamanAttempt: vi.fn(),
}))

describe('KnowledgeCheck', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mengirim skor awal dan meneruskan jumlah jawaban benar setelah seluruh cek dijawab', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<KnowledgeCheck phase="awal" onComplete={onComplete} />)

    await user.click(screen.getByRole('radio', { name: /nama toko pada hasil scan harus sesuai/i }))
    await user.click(screen.getByRole('button', { name: 'Lanjut' }))
    await user.click(screen.getByRole('radio', { name: /notifikasi resmi di perangkat atau rekening pedagang sendiri/i }))
    await user.click(screen.getByRole('button', { name: 'Lanjut' }))
    await user.click(screen.getByRole('radio', { name: /nominal di perangkat pedagang sendiri/i }))
    await user.click(screen.getByRole('button', { name: 'Lihat ringkasan' }))

    expect(submitPemahamanAttempt).toHaveBeenCalledWith({ modul: 'keamanan', fase: 'awal', skor: 3, totalCount: 3 })
    expect(onComplete).toHaveBeenCalledWith(3)
    expect(screen.getByText(/3 dari 3 poin/)).toBeInTheDocument()
  })
})
