import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import KalkulatorWizard from './KalkulatorWizard'

describe('KalkulatorWizard', () => {
  it('tidak bisa lanjut tanpa menjawab, lalu menyelesaikan seluruh wizard', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<KalkulatorWizard onComplete={onComplete} />)

    expect(screen.getByRole('button', { name: 'Lanjut' })).toBeDisabled()

    await user.click(screen.getByLabelText('Kurang dari Rp100.000'))
    expect(screen.getByRole('button', { name: 'Lanjut' })).toBeEnabled()
    await user.click(screen.getByRole('button', { name: 'Lanjut' }))

    // Step 2: pengalaman - cek eksklusivitas "tidak-pernah"
    await user.click(screen.getByLabelText('Uang robek/sobek'))
    await user.click(screen.getByLabelText('Uang basah/lusuh berat'))
    await user.click(screen.getByLabelText('Belum pernah mengalami hal di atas'))

    expect(screen.getByLabelText('Belum pernah mengalami hal di atas')).toBeChecked()
    expect(screen.getByLabelText('Uang robek/sobek')).not.toBeChecked()
    expect(screen.getByLabelText('Uang basah/lusuh berat')).not.toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Lanjut' }))

    // Step 3: waktu
    await user.click(screen.getByLabelText('20 – 40 menit'))
    await user.click(screen.getByRole('button', { name: 'Lanjut' }))

    // Step 4: rekening
    await user.click(screen.getByLabelText('Belum punya'))
    await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))

    expect(onComplete).toHaveBeenCalledWith({
      omzetHarian: 75000,
      pengalaman: ['tidak-pernah'],
      waktuMenit: 30,
      punyaRekening: 'belum',
    })
  })

  it('tombol Sebelumnya mengembalikan ke langkah sebelumnya', async () => {
    const user = userEvent.setup()
    render(<KalkulatorWizard onComplete={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Sebelumnya' })).toBeDisabled()

    await user.click(screen.getByLabelText('Kurang dari Rp100.000'))
    await user.click(screen.getByRole('button', { name: 'Lanjut' }))

    expect(screen.getByText(/Pernahkah kamu mengalami/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Sebelumnya' }))
    expect(screen.getByLabelText('Kurang dari Rp100.000')).toBeChecked()
  })
})
