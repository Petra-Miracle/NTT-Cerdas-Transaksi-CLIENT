// Efek suara ringan untuk reaksi KoRa (Web Audio API sintetis — tidak ada
// file audio yang di-fetch, jadi tidak menambah beban bundle/network).
// Gagal diam-diam kalau AudioContext tidak tersedia (browser lama, jsdom
// tanpa polyfill, atau kebijakan otoplay) — animasi visual tetap jalan.
const SOUND_CONFIG = {
  correct: { from: 523, to: 784 }, // C5 -> G5, nada naik ceria
  incorrect: { from: 330, to: 247 }, // E4 -> B3, nada turun lembut (bukan buzzer negatif)
}

export function playKoraSound(outcome) {
  const config = SOUND_CONFIG[outcome]
  if (!config) return

  try {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    oscillator.frequency.setValueAtTime(config.from, now)
    oscillator.frequency.exponentialRampToValueAtTime(config.to, now + 0.16)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

    oscillator.start(now)
    oscillator.stop(now + 0.2)
    oscillator.onended = () => ctx.close()
  } catch {
    // Diabaikan: efek suara bersifat dekoratif, tidak boleh mengganggu UX.
  }
}
