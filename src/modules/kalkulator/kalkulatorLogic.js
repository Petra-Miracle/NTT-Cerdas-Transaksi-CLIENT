import { UPAH_PER_JAM } from './kalkulatorContent'

/**
 * Rumus persis dari HANDOFF-REBUILD-FULLSTACK.md §3.1 — jangan diubah.
 * P2 (pengalaman) dan P4 (rekening) sengaja tidak masuk hitungan angka,
 * keduanya murni membentuk narasi.
 */
export function calculateResult({ omzetHarian, waktuMenit }) {
  const uangTunaiPerBulan = omzetHarian * 30
  const jamPerBulan = (waktuMenit * 30) / 60
  const nilaiWaktuBulanan = jamPerBulan * UPAH_PER_JAM

  return { uangTunaiPerBulan, jamPerBulan, nilaiWaktuBulanan }
}

export function togglePengalaman(current, value, exclusiveValue) {
  if (value === exclusiveValue) {
    return current.includes(value) ? [] : [exclusiveValue]
  }

  const withoutExclusive = current.filter((item) => item !== exclusiveValue)
  return withoutExclusive.includes(value)
    ? withoutExclusive.filter((item) => item !== value)
    : [...withoutExclusive, value]
}
