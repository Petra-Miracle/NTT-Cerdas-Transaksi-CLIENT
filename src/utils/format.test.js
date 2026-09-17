import { describe, expect, it } from 'vitest'
import { formatJam, formatRupiah } from './format'

describe('formatRupiah', () => {
  it('memformat angka jadi format Rupiah Indonesia', () => {
    expect(formatRupiah(2250000)).toBe('Rp2.250.000')
    expect(formatRupiah(225000)).toBe('Rp225.000')
  })
})

describe('formatJam', () => {
  it('menampilkan angka bulat tanpa desimal', () => {
    expect(formatJam(15)).toBe('15 jam')
    expect(formatJam(25)).toBe('25 jam')
  })

  it('menampilkan desimal dengan koma', () => {
    expect(formatJam(2.5)).toBe('2,5 jam')
    expect(formatJam(7.5)).toBe('7,5 jam')
  })
})
