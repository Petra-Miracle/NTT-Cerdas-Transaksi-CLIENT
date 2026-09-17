import { describe, expect, it } from 'vitest'
import { TIDAK_PERNAH_VALUE } from './kalkulatorContent'
import { calculateResult, togglePengalaman } from './kalkulatorLogic'

describe('calculateResult', () => {
  it('menghitung contoh omzet Rp75.000/hari sesuai dokumen perhitungan', () => {
    const result = calculateResult({ omzetHarian: 75000, waktuMenit: 5 })
    expect(result.uangTunaiPerBulan).toBe(2250000)
  })

  it('menghitung contoh waktu 30 menit/hari -> 15 jam & Rp225.000', () => {
    const result = calculateResult({ omzetHarian: 300000, waktuMenit: 30 })
    expect(result.jamPerBulan).toBe(15)
    expect(result.nilaiWaktuBulanan).toBe(225000)
  })

  it('menghitung seluruh kombinasi omzet sesuai tabel handoff', () => {
    expect(calculateResult({ omzetHarian: 300000, waktuMenit: 5 }).uangTunaiPerBulan).toBe(9000000)
    expect(calculateResult({ omzetHarian: 750000, waktuMenit: 5 }).uangTunaiPerBulan).toBe(22500000)
    expect(calculateResult({ omzetHarian: 1250000, waktuMenit: 5 }).uangTunaiPerBulan).toBe(37500000)
  })

  it('menghitung seluruh kombinasi waktu sesuai tabel handoff', () => {
    expect(calculateResult({ omzetHarian: 75000, waktuMenit: 5 }).jamPerBulan).toBe(2.5)
    expect(calculateResult({ omzetHarian: 75000, waktuMenit: 15 }).jamPerBulan).toBe(7.5)
    expect(calculateResult({ omzetHarian: 75000, waktuMenit: 50 }).jamPerBulan).toBe(25)
  })
})

describe('togglePengalaman', () => {
  it('memilih opsi non-eksklusif menambahkannya ke daftar', () => {
    const result = togglePengalaman([], 'robek', TIDAK_PERNAH_VALUE)
    expect(result).toEqual(['robek'])
  })

  it('memilih tidak-pernah menghapus semua opsi lain', () => {
    const result = togglePengalaman(['robek', 'basah'], TIDAK_PERNAH_VALUE, TIDAK_PERNAH_VALUE)
    expect(result).toEqual([TIDAK_PERNAH_VALUE])
  })

  it('memilih opsi lain setelah tidak-pernah membatalkan tidak-pernah', () => {
    const result = togglePengalaman([TIDAK_PERNAH_VALUE], 'kabur', TIDAK_PERNAH_VALUE)
    expect(result).toEqual(['kabur'])
  })

  it('mengklik ulang opsi yang sudah dipilih membatalkannya', () => {
    const result = togglePengalaman(['robek'], 'robek', TIDAK_PERNAH_VALUE)
    expect(result).toEqual([])
  })
})
