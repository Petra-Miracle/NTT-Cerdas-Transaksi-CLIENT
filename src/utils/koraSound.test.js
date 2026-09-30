import { afterEach, describe, expect, it, vi } from 'vitest'
import { playKoraSound } from './koraSound'

function createAudioContextMock() {
  const oscillator = {
    connect: vi.fn(),
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    start: vi.fn(),
    stop: vi.fn(),
    onended: null,
  }
  const gain = {
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }
  const context = {
    currentTime: 1,
    destination: {},
    createOscillator: vi.fn(() => oscillator),
    createGain: vi.fn(() => gain),
    close: vi.fn(),
  }

  return { context, oscillator, gain }
}

describe('playKoraSound', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('memainkan nada naik singkat untuk jawaban benar', () => {
    const audio = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return audio.context }))

    playKoraSound('correct')

    expect(audio.context.createOscillator).toHaveBeenCalledOnce()
    expect(audio.oscillator.frequency.setValueAtTime).toHaveBeenCalledWith(523, 1)
    expect(audio.oscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(784, 1.16)
    expect(audio.oscillator.start).toHaveBeenCalledWith(1)
    expect(audio.oscillator.stop).toHaveBeenCalledWith(1.2)
  })

  it('memainkan nada lembut menurun untuk jawaban yang perlu diperbaiki', () => {
    const audio = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return audio.context }))

    playKoraSound('incorrect')

    expect(audio.oscillator.frequency.setValueAtTime).toHaveBeenCalledWith(330, 1)
    expect(audio.oscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(247, 1.16)
  })

  it('tidak membuat suara untuk outcome netral atau jika Web Audio tidak tersedia', () => {
    const audio = createAudioContextMock()
    const audioContext = vi.fn(() => audio.context)
    vi.stubGlobal('AudioContext', audioContext)

    playKoraSound('neutral')
    expect(audioContext).not.toHaveBeenCalled()

    vi.stubGlobal('AudioContext', undefined)
    expect(() => playKoraSound('correct')).not.toThrow()
  })
})
