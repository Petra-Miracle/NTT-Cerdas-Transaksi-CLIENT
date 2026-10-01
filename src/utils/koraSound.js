// Efek suara Web Audio API sintetis — tanpa file audio tambahan, jadi tidak
// menambah beban bundle/network. Gagal diam-diam kalau AudioContext tidak
// tersedia (browser lama, jsdom, atau kebijakan autoplay) — visual tetap jalan.
//
// - 'correct'   → "ding!" centang: dua nada sinus cerah menanjak (A5 → E6).
// - 'incorrect' → "tetot" kuis: dua nada square menurun (Bb3 → Eb3).
const CORRECT_NOTES = [
  { freq: 880, at: 0, len: 0.12 }, // A5 — "ding"
  { freq: 1318.5, at: 0.1, len: 0.24 }, // E6 — "(d)ing!"
]

const WRONG_NOTES = [
  { freq: 233.08, at: 0, len: 0.18 }, // Bb3 — "te-"
  { freq: 155.56, at: 0.2, len: 0.34 }, // Eb3 — "tot"
]

function playTone(ctx, notes, index, type, peak) {
  const note = notes[index]
  const isLast = index === notes.length - 1
  const t0 = ctx.currentTime + note.at

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(note.freq, t0)

  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + note.len)

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  oscillator.start(t0)
  oscillator.stop(t0 + note.len + 0.05)
  if (isLast) {
    oscillator.onended = () => {
      try {
        ctx.close()
      } catch {
        // Abaikan — konteks audio hanya dekoratif.
      }
    }
  }
}

export function playKoraSound(outcome, volume = 1) {
  const isCorrect = outcome === 'correct'
  const isWrong = outcome === 'incorrect'
  if (!isCorrect && !isWrong) return

  try {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    const notes = isCorrect ? CORRECT_NOTES : WRONG_NOTES
    const type = isCorrect ? 'sine' : 'square'
    const peak = (isCorrect ? 0.14 : 0.09) * volume

    notes.forEach((_, index) => playTone(ctx, notes, index, type, peak))
  } catch {
    // Diabaikan: efek suara bersifat dekoratif, tidak boleh mengganggu UX.
  }
}
