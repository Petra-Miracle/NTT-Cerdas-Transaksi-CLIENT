import { act, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import KeamananFlow from './KeamananFlow'
import { SKENARIO_MICROCOPY } from './keamananMicrocopy'

describe('KeamananFlow narasi soal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('membacakan skenario dengan suara perempuan saat soal dibuka', async () => {
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

    render(
      <MemoryRouter>
        <KeamananFlow />
      </MemoryRouter>,
    )

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(speak).toHaveBeenCalledOnce()
    expect(utterances[0].text).toBe(SKENARIO_MICROCOPY[1].cerita)
    expect(utterances[0].lang).toBe('id-ID')
  })
})
