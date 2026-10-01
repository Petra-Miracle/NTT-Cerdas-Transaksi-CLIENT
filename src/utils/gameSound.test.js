import { afterEach, describe, expect, it, vi } from 'vitest'
import { getResultSound, playAww, playFail, playVictory, playYey } from './gameSound'

function createAudioContextMock() {
  const oscillator = () => ({
    type: '',
    connect: vi.fn(),
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    start: vi.fn(),
    stop: vi.fn(),
    onended: null,
  })
  const context = {
    currentTime: 2,
    sampleRate: 44100,
    destination: {},
    createOscillator: vi.fn(oscillator),
    createGain: vi.fn(() => ({
      connect: vi.fn(),
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    })),
    createBuffer: vi.fn(() => ({ getChannelData: vi.fn(() => new Float32Array(8)) })),
    createBufferSource: vi.fn(() => ({
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null,
      buffer: null,
    })),
    createBiquadFilter: vi.fn(() => ({
      type: '',
      frequency: { value: 0 },
      Q: { value: 0 },
      connect: vi.fn(),
    })),
    close: vi.fn(),
  }

  return context
}

function getOscillators(context) {
  return context.createOscillator.mock.results.map((result) => result.value)
}

describe('gameSound', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('memainkan fanfare hore + tepuk tangan untuk kemenangan', () => {
    const context = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return context }))

    playVictory(0.6)

    // 6 nada fanfare + 1 oktaf atas.
    expect(context.createOscillator).toHaveBeenCalledTimes(7)
    const [first] = getOscillators(context)
    expect(first.frequency.setValueAtTime).toHaveBeenCalledWith(523.25, 2)
    // Tepuk tangan: noise buffer + bandpass.
    expect(context.createBuffer).toHaveBeenCalledOnce()
    const filter = context.createBiquadFilter.mock.results[0].value
    expect(filter.type).toBe('bandpass')

    // Konteks ditutup setelah suara terakhir selesai.
    expect(context.close).not.toHaveBeenCalled()
    const last = getOscillators(context).at(-1)
    const claps = context.createBufferSource.mock.results[0].value
    claps.onended()
    expect(context.close).toHaveBeenCalledOnce()
    expect(last).toBeDefined()
  })

  it('memainkan jingle gagal menurun', () => {
    const context = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return context }))

    playFail(0.6)

    expect(context.createOscillator).toHaveBeenCalledTimes(4)
    const oscillators = getOscillators(context)
    expect(oscillators[0].frequency.setValueAtTime).toHaveBeenCalledWith(392, 2)
    const [, lastTime] = oscillators[3].frequency.setValueAtTime.mock.calls[0]
    expect(oscillators[3].frequency.setValueAtTime).toHaveBeenCalledWith(293.66, expect.any(Number))
    expect(lastTime).toBeCloseTo(2.78)
    expect(context.createBuffer).not.toHaveBeenCalled()
  })

  it('gagal diam-diam bila Web Audio tidak tersedia', () => {
    vi.stubGlobal('AudioContext', undefined)
    expect(() => playVictory()).not.toThrow()
    expect(() => playFail()).not.toThrow()
  })

  it('memilih bunyi hasil sesuai ambang: ≥80% hore, <75% gagal', () => {
    expect(getResultSound(100)).toBe('victory')
    expect(getResultSound(80)).toBe('victory')
    expect(getResultSound(79)).toBe('ding')
    expect(getResultSound(75)).toBe('ding')
    expect(getResultSound(74)).toBe('fail')
    expect(getResultSound(0)).toBe('fail')
  })

  it('memainkan yey + tepuk tangan untuk tebakan tepat', () => {
    const context = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return context }))

    playYey()

    expect(context.createOscillator).toHaveBeenCalledTimes(3)
    const [first, , third] = getOscillators(context)
    expect(first.frequency.setValueAtTime).toHaveBeenCalledWith(659.25, 2)
    expect(third.frequency.setValueAtTime).toHaveBeenCalledWith(1046.5, expect.any(Number))
    const [, thirdTime] = third.frequency.setValueAtTime.mock.calls[0]
    expect(thirdTime).toBeCloseTo(2.22)
    expect(context.createBuffer).toHaveBeenCalledOnce()
  })

  it('memainkan ow-ow melandai untuk tebakan meleset', () => {
    const context = createAudioContextMock()
    vi.stubGlobal('AudioContext', vi.fn(function AudioContextMock() { return context }))

    playAww()

    expect(context.createOscillator).toHaveBeenCalledTimes(2)
    const [first, second] = getOscillators(context)
    expect(first.type).toBe('sine')
    expect(first.frequency.setValueAtTime).toHaveBeenCalledWith(392, 2)
    expect(second.frequency.setValueAtTime).toHaveBeenCalledWith(329.63, expect.any(Number))
    const [, secondTime] = second.frequency.setValueAtTime.mock.calls[0]
    expect(secondTime).toBeCloseTo(2.3)
    expect(context.createBuffer).not.toHaveBeenCalled()
  })
})
