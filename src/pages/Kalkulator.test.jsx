import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitKalkulatorResult } from '../services/api'
import Kalkulator from './Kalkulator'

vi.mock('../services/api', () => ({
  submitKalkulatorResult: vi.fn(),
}))

async function completeWizard(user) {
  await user.click(screen.getByLabelText('Lebih dari Rp1.000.000'))
  await user.click(screen.getByRole('button', { name: 'Lanjut' }))
  await user.click(screen.getByLabelText('Pelanggan kabur tanpa bayar'))
  await user.click(screen.getByRole('button', { name: 'Lanjut' }))
  await user.click(screen.getByLabelText('Lebih dari 40 menit'))
  await user.click(screen.getByRole('button', { name: 'Lanjut' }))
  await user.click(screen.getByLabelText('Sudah punya'))
  await user.click(screen.getByRole('button', { name: 'Lihat hasil' }))
}

describe('Kalkulator page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('menampilkan hasil, mengirim analytics, dan bisa direset', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Kalkulator />
      </MemoryRouter>,
    )

    await completeWizard(user)

    expect(screen.getByTestId('kalkulator-result')).toBeInTheDocument()
    expect(screen.getByText('25 jam')).toBeInTheDocument()
    expect(screen.getByText(/Pelanggan kabur tanpa bayar/)).toBeInTheDocument()
    expect(screen.getByText(/kamu sudah punya rekening bank sendiri/)).toBeInTheDocument()

    expect(submitKalkulatorResult).toHaveBeenCalledWith(
      expect.objectContaining({
        omzetHarian: 1250000,
        waktuMenit: 50,
        punyaRekening: true,
        uangTunaiPerBulan: 37500000,
      }),
    )

    await user.click(screen.getByRole('button', { name: '↻ Hitung ulang' }))
    expect(screen.getByTestId('kalkulator-wizard')).toBeInTheDocument()
  })
})
