import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { QUESTIONS } from './kalkulatorContent'
import KalkulatorWizard from './KalkulatorWizard'

describe('KalkulatorWizard', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })
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

  it('membacakan pertanyaan dengan suara perempuan tiap langkah dibuka', async () => {
    vi.useFakeTimers()
    const speak = vi.fn()
    const cancel = vi.fn()
    const utterances = []
    class UtteranceMock {
      constructor(text) {
        this.text = text
        utterances.push(this)
      }
    }
    vi.stubGlobal('speechSynthesis', {
      speak,
      cancel,
      getVoices: () => [{ name: 'Wanita Indonesia', lang: 'id-ID' }],
    })
    vi.stubGlobal('SpeechSynthesisUtterance', UtteranceMock)

    render(<KalkulatorWizard onComplete={vi.fn()} />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(speak).toHaveBeenCalledOnce()
    expect(utterances[0].text).toBe(QUESTIONS.omzet)
    expect(utterances[0].lang).toBe('id-ID')
  })
})
