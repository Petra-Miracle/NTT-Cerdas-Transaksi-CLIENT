// Sound game untuk hasil Kuis CBP Rupiah — sintetis via Web Audio API, tanpa
// file audio. Gagal diam-diam bila tidak tersedia.
//
// - playVictory: fanfare "hore!" menanjak + hujan tepuk tangan.
// - playFail: jingle gagal menurun ala game ("wah-wah-wah-waaah").
const FANFARE = [
  { freq: 523.25, at: 0, len: 0.14 }, // C5
  { freq: 523.25, at: 0.16, len: 0.14 }, // C5
  { freq: 523.25, at: 0.32, len: 0.14 }, // C5
  { freq: 659.25, at: 0.48, len: 0.28 }, // E5
  { freq: 783.99, at: 0.78, len: 0.28 }, // G5
  { freq: 1046.5, at: 1.08, len: 0.55 }, // C6 — "hore!"
]

const FAIL_NOTES = [
  { freq: 392, at: 0, len: 0.24 }, // G4
  { freq: 369.99, at: 0.26, len: 0.24 }, // F#4
  { freq: 349.23, at: 0.52, len: 0.24 }, // F4
  { freq: 293.66, at: 0.78, len: 0.55 }, // D4 — nada jatuh
]

function createContext() {
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
  if (!AudioContextClass) return null
  return new AudioContextClass()
}

function playNote(ctx, dest, { type, freq, at, len, peak, droop = 1 }) {
  const t0 = ctx.currentTime + at
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (droop !== 1) osc.frequency.exponentialRampToValueAtTime(freq * droop, t0 + len)

  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + len)

  osc.connect(gain)
  gain.connect(dest)
  osc.start(t0)
  osc.stop(t0 + len + 0.05)
  return { osc, endAt: t0 + len + 0.05 }
}

// Tepuk tangan: noise putih lewat bandpass + amplop kerumunan.
function applause(ctx, dest, volume, delay = 0, duration = 2.2) {
  const sampleRate = ctx.sampleRate ?? 44100
  const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1

  const t0 = ctx.currentTime + delay
  const src = ctx.createBufferSource()
  src.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1400
  filter.Q.value = 0.8

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(0.5 * volume, t0 + 0.15)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(dest)
  src.start(t0)
  src.stop(t0 + duration + 0.05)
  return { src, endAt: t0 + duration + 0.05 }
}

function closeWhenDone(ctx, handles) {
  const last = handles.reduce((latest, handle) => (handle.endAt > latest.endAt ? handle : latest))
  const target = last.osc ?? last.src
  target.onended = () => {
    try {
      ctx.close()
    } catch {
      // Abaikan — konteks audio hanya dekoratif.
    }
  }
}

// Aturan bunyi hasil: ≥80% hore + tepuk tangan, <75% jingle gagal,
// di antaranya (75–79%) ding biasa.
export function getResultSound(percent) {
  if (percent >= 80) return 'victory'
  if (percent < 75) return 'fail'
  return 'ding'
}

export function playVictory(volume = 0.6) {  try {
    const ctx = createContext()
    if (!ctx) return

    const peak = 0.22 * volume
    const notes = FANFARE.map((note) => playNote(ctx, ctx.destination, { ...note, type: 'triangle', peak }))
    // Trompet ganda: oktaf atas pelan di nada pamungkas.
    notes.push(
      playNote(ctx, ctx.destination, { freq: 2093, at: 1.08, len: 0.55, type: 'sine', peak: peak * 0.4 }),
    )
    const claps = applause(ctx, ctx.destination, volume, 0.9)
    closeWhenDone(ctx, [...notes, claps])
  } catch {
    // Diabaikan: efek suara dekoratif.
  }
}

export function playFail(volume = 0.6) {
  try {
    const ctx = createContext()
    if (!ctx) return

    const peak = 0.2 * volume
    const notes = FAIL_NOTES.map((note, index) =>
      playNote(ctx, ctx.destination, {
        ...note,
        type: index === FAIL_NOTES.length - 1 ? 'sawtooth' : 'triangle',
        peak,
        droop: 0.94,
      }),
    )
    closeWhenDone(ctx, notes)
  } catch {
    // Diabaikan: efek suara dekoratif.
  }
}

// "Yey!" tiap tebakan tepat: arpeggio ceria + tepuk tangan singkat.
export function playYey(volume = 0.6) {
  const YEY_NOTES = [
    { freq: 659.25, at: 0, len: 0.12 }, // E5
    { freq: 783.99, at: 0.11, len: 0.12 }, // G5
    { freq: 1046.5, at: 0.22, len: 0.3 }, // C6 — "yey!"
  ]

  try {
    const ctx = createContext()
    if (!ctx) return

    const peak = 0.2 * volume
    const notes = YEY_NOTES.map((note) => playNote(ctx, ctx.destination, { ...note, type: 'triangle', peak }))
    const claps = applause(ctx, ctx.destination, volume, 0.25, 1.2)
    closeWhenDone(ctx, [...notes, claps])
  } catch {
    // Diabaikan: efek suara dekoratif.
  }
}

// "Ow-ow" tiap tebakan meleset: dua nada melandai penuh simpati.
export function playAww(volume = 0.6) {
  const AWW_NOTES = [
    { freq: 392, at: 0, len: 0.32 }, // G4 → "ow"
    { freq: 329.63, at: 0.3, len: 0.42 }, // E4 → "ow"
  ]

  try {
    const ctx = createContext()
    if (!ctx) return

    const peak = 0.14 * volume
    const notes = AWW_NOTES.map((note) =>
      playNote(ctx, ctx.destination, { ...note, type: 'sine', peak, droop: 0.8 }),
    )
    closeWhenDone(ctx, notes)
  } catch {
    // Diabaikan: efek suara dekoratif.
  }
}
