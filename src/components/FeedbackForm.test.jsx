import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitFeedback } from '../services/api'
import FeedbackForm from './FeedbackForm'

vi.mock('../services/api', () => ({
  submitFeedback: vi.fn(),
}))

describe('FeedbackForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tombol kirim nonaktif sampai pemahaman dan relevansi dipilih', async () => {
    const user = userEvent.setup()
    render(<FeedbackForm modul="keamanan" />)

    const kirim = screen.getByRole('button', { name: 'Kirim masukan' })
    expect(kirim).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: '4' }))
    expect(kirim).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: 'Ya, relevan' }))
    expect(kirim).toBeEnabled()
  })

  it('mengirim masukan anonim lalu menampilkan konfirmasi', async () => {
    const user = userEvent.setup()
    render(<FeedbackForm modul="keamanan" />)

    await user.click(screen.getByRole('radio', { name: '5' }))
    await user.click(screen.getByRole('radio', { name: 'Sebagian' }))
    await user.type(screen.getByLabelText(/paling membantu atau masih membingungkan/), '  Skenario QR palsu jelas  ')
    await user.click(screen.getByRole('button', { name: 'Kirim masukan' }))

    expect(submitFeedback).toHaveBeenCalledTimes(1)
    expect(submitFeedback).toHaveBeenCalledWith({
      modul: 'keamanan',
      pemahaman: 5,
      relevansi: 'sebagian',
      komentar: 'Skenario QR palsu jelas',
      laporanKonten: false,
    })
    expect(screen.getByRole('status')).toHaveTextContent('Terima kasih')
    expect(screen.queryByRole('button', { name: 'Kirim masukan' })).not.toBeInTheDocument()
  })

  it('menyertakan laporan informasi kurang tepat bila dicentang', async () => {
    const user = userEvent.setup()
    render(<FeedbackForm modul="kuis" />)

    await user.click(screen.getByRole('radio', { name: '2' }))
    await user.click(screen.getByRole('radio', { name: 'Tidak' }))
    await user.click(screen.getByRole('checkbox', { name: /informasi yang kurang tepat/ }))
    await user.click(screen.getByRole('button', { name: 'Kirim masukan' }))

    expect(submitFeedback).toHaveBeenCalledWith(expect.objectContaining({ modul: 'kuis', laporanKonten: true }))
  })

  it('membatasi komentar maksimal 500 karakter', () => {
    render(<FeedbackForm modul="kalkulator" />)
    expect(screen.getByLabelText(/paling membantu atau masih membingungkan/)).toHaveAttribute('maxLength', '500')
  })
})
