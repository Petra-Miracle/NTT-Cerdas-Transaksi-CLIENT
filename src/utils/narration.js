// Narasi soal dengan suara perempuan (SpeechSynthesis bawaan browser, tanpa
// file audio). Dipakai modul Keamanan QRIS: tiap skenario dibacakan otomatis
// saat dibuka, pengguna tinggal memilih jawaban. Gagal diam-diam bila API
// tidak tersedia (mis. jsdom) — teks soal tetap terbaca manual.
const FEMALE_HINTS = ['female', 'wanita', 'perempuan', 'gadis', 'google bahasa indonesia']

export function pickFemaleVoice() {
  try {
    const synth = window.speechSynthesis
    if (!synth?.getVoices) return null
    const voices = synth.getVoices() ?? []
    const indonesian = voices.filter((voice) =>
      voice.lang?.toLowerCase().startsWith('id'),
    )
    const pool = indonesian.length > 0 ? indonesian : voices
    const female = pool.find((voice) =>
      FEMALE_HINTS.some((hint) => `${voice.name ?? ''}`.toLowerCase().includes(hint)),
    )
    return female ?? pool.find((voice) => voice.lang?.toLowerCase() === 'id-id') ?? pool[0] ?? null
  } catch {
    return null
  }
}

export function speakScenario(text, { volume = 0.9, rate = 0.95, pitch = 1.15 } = {}) {
  try {
    const synth = window.speechSynthesis
    if (!synth?.speak || typeof window.SpeechSynthesisUtterance === 'undefined') return false
    synth.cancel()
    const utterance = new window.SpeechSynthesisUtterance(text)
    const voice = pickFemaleVoice()
    if (voice) utterance.voice = voice
    utterance.lang = 'id-ID'
    utterance.volume = volume
    utterance.rate = rate
    utterance.pitch = pitch
    synth.speak(utterance)
    return true
  } catch {
    return false
  }
}

export function stopNarration() {
  try {
    window.speechSynthesis?.cancel()
  } catch {
    // Abaikan.
  }
}
