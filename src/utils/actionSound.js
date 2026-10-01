// Loop tegang untuk mode jawab Keamanan QRIS: detak jantung + denyut bass
// minor + sesekali nada tinggi menggantung — membawa pengguna ke suasana
// kasus penipuan beneran. Sintetis via Web Audio API, volume default 40%,
// gagal diam-diam bila tidak tersedia.
const STEP = 0.25
const CHUNK = 8

let ctx = null
let master = null
let timer = null
let playing = false
let step = 0

function thump(when, freq, peak, len = 0.16) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, when)
  osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.4), when + len)

  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + len)

  osc.connect(gain)
  gain.connect(master)
  osc.start(when)
  osc.stop(when + len + 0.05)
}

function pulse(when, freq, peak, len = 0.2, type = 'triangle') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, when)

  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + len)

  osc.connect(gain)
  gain.connect(master)
  osc.start(when)
  osc.stop(when + len + 0.05)
}

function scheduleChunk() {
  if (!playing || !ctx) return
  const base = ctx.currentTime + 0.06
  for (let i = 0; i < CHUNK; i += 1) {
    const index = (step + i) % 32
    const when = base + i * STEP

    // Denyut bass minor tiap dua langkah.
    if (i % 2 === 0) pulse(when, 82.41, 0.16)

    // Detak jantung tiap 4 detik: "lub-dub".
    if (index % 16 === 0) {
      thump(when, 110, 0.5)
      thump(when + 0.17, 82, 0.4)
    }

    // Nada tinggi menggantung tiap 8 detik.
    if (index === 24) pulse(when, 466.16, 0.05, 1.1, 'sine')
  }
  step = (step + CHUNK) % 32
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

export function startAction({ volume = 0.4 } = {}) {
  if (playing) {
    resumeQuietly()
    return
  }

  try {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) return

    ctx = new AudioContextClass()
    master = ctx.createGain()
    master.gain.value = 0.12 * volume
    master.connect(ctx.destination)

    playing = true
    resumeQuietly()
    scheduleChunk()
  } catch {
    // Abaikan — musik latar tidak boleh mengganggu UX.
  }
}

export function stopAction() {
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

export function isActionPlaying() {
  return playing
}
