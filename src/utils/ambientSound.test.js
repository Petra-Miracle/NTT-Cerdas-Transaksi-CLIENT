import { afterEach, describe, expect, it, vi } from 'vitest'
import { isAmbientPlaying, startAmbient, stopAmbient } from './ambientSound'

function createAudioContextMock() {
  const gainNode = {
    connect: vi.fn(),
    gain: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }
  const context = {
    currentTime: 0,
    destination: {},
    state: 'running',
    resume: vi.fn(() => Promise.resolve()),
    createOscillator: vi.fn(() => ({
      type: '',
      connect: vi.fn(),
      frequency: { setValueAtTime: vi.fn() },
      start: vi.fn(),
      stop: vi.fn(),
    })),
    createGain: vi.fn(() => ({
      connect: vi.fn(),
      gain: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    })),
    close: vi.fn(),
  }

  return { context, gainNode }
}

describe('ambientSound', () => {
  afterEach(() => {
    stopAmbient()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('tidak melakukan apa-apa bila Web Audio tidak tersedia', () => {
    vi.stubGlobal('AudioContext', undefined)
    expect(() => startAmbient()).not.toThrow()
    expect(isAmbientPlaying()).toBe(false)
  })

  it('memulai loop musik latar pelan dan bisa dihentikan', () => {
    vi.useFakeTimers()
    const audio = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return audio.context }))

    startAmbient({ volume: 0.4 })

    expect(isAmbientPlaying()).toBe(true)
    // Master gain pelan: basis kecil × 40%.
    const masterGain = audio.context.createGain.mock.results[0].value
    expect(masterGain.gain.value).toBeCloseTo(0.048)
    expect(audio.context.createOscillator).toHaveBeenCalled()

    stopAmbient()
    expect(isAmbientPlaying()).toBe(false)
    expect(audio.context.close).toHaveBeenCalled()
  })

  it('stopAmbient aman dipanggil tanpa start lebih dulu', () => {
    expect(() => stopAmbient()).not.toThrow()
  })
})
