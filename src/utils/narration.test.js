import { afterEach, describe, expect, it, vi } from 'vitest'
import { pickFemaleVoice, speakScenario, stopNarration } from './narration'

function stubSpeech(voices) {
  const speak = vi.fn()
  const cancel = vi.fn()
  const utterances = []
  class SpeechSynthesisUtteranceMock {
    constructor(text) {
      this.text = text
      utterances.push(this)
    }
  }
  vi.stubGlobal('speechSynthesis', { speak, cancel, getVoices: () => voices })
  vi.stubGlobal('SpeechSynthesisUtterance', SpeechSynthesisUtteranceMock)
  return { speak, cancel, utterances }
}

describe('narration', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('tidak melakukan apa-apa bila SpeechSynthesis tidak tersedia', () => {
    vi.stubGlobal('speechSynthesis', undefined)
    expect(speakScenario('Halo')).toBe(false)
    expect(() => stopNarration()).not.toThrow()
  })

  it('membacakan teks dengan suara perempuan Indonesia', () => {
    const { speak, utterances } = stubSpeech([
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Google Bahasa Indonesia', lang: 'id-ID' },
    ])

    expect(speakScenario('Seorang pembeli memindai QR.')).toBe(true)
    expect(speak).toHaveBeenCalledOnce()

    const [utterance] = utterances
    expect(utterance.lang).toBe('id-ID')
    expect(utterance.voice?.name).toBe('Google Bahasa Indonesia')
    expect(utterance.pitch).toBeGreaterThan(1)
  })

  it('pickFemaleVoice memilih suara id perempuan bila ada', () => {
    stubSpeech([
      { name: 'Laki-Laki', lang: 'id-ID' },
      { name: 'Wanita Indonesia', lang: 'id-ID' },
    ])

    expect(pickFemaleVoice()?.name).toBe('Wanita Indonesia')
  })
})
