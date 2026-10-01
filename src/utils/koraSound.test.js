import { afterEach, describe, expect, it, vi } from 'vitest'
import { playKoraSound } from './koraSound'

vi.mock('../assets/audio/kora-correct.mp3', () => ({ default: '/audio/kora-correct.mp3' }))
vi.mock('../assets/audio/kora-incorrect.mp3', () => ({ default: '/audio/kora-incorrect.mp3' }))

function createOscillatorMock() {
  return {
    type: '',
    connect: vi.fn(),
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    start: vi.fn(),
    stop: vi.fn(),
    onended: null,
  }
}

function createAudioContextMock() {
  const gain = {
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }
  const context = {
    currentTime: 1,
    destination: {},
    createOscillator: vi.fn(() => createOscillatorMock()),
    createGain: vi.fn(() => gain),
    close: vi.fn(),
  }

  return { context, gain }
}

function getOscillators(audio) {
  return audio.context.createOscillator.mock.results.map((result) => result.value)
}

describe('playKoraSound', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('memainkan "ding!" centang dua nada sinus menanjak untuk jawaban benar', () => {
    const audio = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return audio.context }))

    playKoraSound('correct')

    expect(audio.context.createOscillator).toHaveBeenCalledTimes(2)
    const [first, second] = getOscillators(audio)
    expect(first.type).toBe('sine')
    expect(first.frequency.setValueAtTime).toHaveBeenCalledWith(880, 1)
    expect(second.type).toBe('sine')
    expect(second.frequency.setValueAtTime).toHaveBeenCalledWith(1318.5, 1.1)

    // Konteks ditutup setelah nada terakhir selesai.
    expect(audio.context.close).not.toHaveBeenCalled()
    second.onended()
    expect(audio.context.close).toHaveBeenCalledOnce()
  })

  it('memainkan "tetot" square menurun untuk jawaban yang perlu diperbaiki', () => {
    const audio = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return audio.context }))

    playKoraSound('incorrect')

    expect(audio.context.createOscillator).toHaveBeenCalledTimes(2)
    const [first, second] = getOscillators(audio)
    expect(first.type).toBe('square')
    expect(first.frequency.setValueAtTime).toHaveBeenCalledWith(233.08, 1)
    expect(second.type).toBe('square')
    expect(second.frequency.setValueAtTime).toHaveBeenCalledWith(155.56, 1.2)
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
