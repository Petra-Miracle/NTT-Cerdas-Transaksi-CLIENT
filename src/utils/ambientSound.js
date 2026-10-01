// Musik latar beranda: loop melodi ceria sintetis (Web Audio API, tanpa file
// audio). Sengaja pelan (default volume 0.4 = 40%) supaya nyaman.
//
// Catatan autoplay browser: AudioContext baru boleh bunyi setelah ada gestur
// pengguna, jadi startAmbient() aman dipanggil kapan saja — kalau konteks
// masih suspended, ia menunggu gestur pertama (pointer/keyboard) lalu jalan
// sendiri. Gagal diam-diam bila Web Audio tidak tersedia.
const MELODY = [
  523.25, 659.25, 783.99, 659.25, // C5 E5 G5 E5
  880, 783.99, 659.25, 587.33, // A5 G5 E5 D5
  523.25, 587.33, 659.25, 587.33, // C5 D5 E5 D5
  523.25, 0, 659.25, 0, // C5 (jeda) E5 (jeda) — bernapas
]

const BASS = 130.81 // C3, penghangat tiap 8 langkah
const STEP = 0.24
const CHUNK = 8

let ctx = null
let master = null
let timer = null
let playing = false
let step = 0

function playNote(freq, when, peak, type = 'triangle') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, when)

  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + STEP)

  osc.connect(gain)
  gain.connect(master)
  osc.start(when)
  osc.stop(when + STEP + 0.05)
}

function scheduleChunk() {
  if (!playing || !ctx) return
  const base = ctx.currentTime + 0.06
  for (let i = 0; i < CHUNK; i += 1) {
    const index = (step + i) % MELODY.length
    const freq = MELODY[index]
    const when = base + i * STEP
    if (freq > 0) playNote(freq, when, 0.5)
    if (index % CHUNK === 0) playNote(BASS, when, 0.25, 'sine')
  }
  step = (step + CHUNK) % MELODY.length
  timer = setTimeout(scheduleChunk, CHUNK * STEP * 1000)
}

function resumeQuietly() {
  try {
    const result = ctx?.resume?.()
    result?.catch?.(() => {})
  } catch {
    // Abaikan — musik hanya dekoratif.
  }
}

export function startAmbient({ volume = 0.4 } = {}) {
  if (playing) {
    resumeQuietly()
    return
  }

  try {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) return

    ctx = new AudioContextClass()
    master = ctx.createGain()
    // 40% dari skala penuh, dari basis yang memang sudah kecil → tetap pelan.
    master.gain.value = 0.12 * volume
    master.connect(ctx.destination)

    playing = true
    resumeQuietly()
    scheduleChunk()
  } catch {
    // Abaikan — musik latar tidak boleh mengganggu UX.
  }
}

export function stopAmbient() {
  playing = false
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  try {
    ctx?.close?.()
  } catch {
    // Abaikan.
  }
  ctx = null
  master = null
}

export function isAmbientPlaying() {
  return playing
}
