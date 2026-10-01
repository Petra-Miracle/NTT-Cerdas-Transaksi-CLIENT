import { afterEach, describe, expect, it, vi } from 'vitest'
import { isActionPlaying, startAction, stopAction } from './actionSound'

function createAudioContextMock() {
  return {
    currentTime: 0,
    destination: {},
    state: 'running',
    resume: vi.fn(() => Promise.resolve()),
    createOscillator: vi.fn(() => ({
      type: '',
      connect: vi.fn(),
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      start: vi.fn(),
      stop: vi.fn(),
    })),
    createGain: vi.fn(() => ({
      connect: vi.fn(),
      gain: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    })),
    close: vi.fn(),
  }
}

describe('actionSound', () => {
  afterEach(() => {
    stopAction()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('tidak melakukan apa-apa bila Web Audio tidak tersedia', () => {
    vi.stubGlobal('AudioContext', undefined)
    expect(() => startAction()).not.toThrow()
    expect(isActionPlaying()).toBe(false)
  })

  it('memulai loop tegang 40% dan bisa dihentikan', () => {
    vi.useFakeTimers()
    const context = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return context }))

    startAction({ volume: 0.4 })

    expect(isActionPlaying()).toBe(true)
    const masterGain = context.createGain.mock.results[0].value
    expect(masterGain.gain.value).toBeCloseTo(0.048)
    expect(context.createOscillator).toHaveBeenCalled()

    stopAction()
    expect(isActionPlaying()).toBe(false)
    expect(context.close).toHaveBeenCalled()
  })

  it('stopAction aman dipanggil tanpa start lebih dulu', () => {
    expect(() => stopAction()).not.toThrow()
  })
})
