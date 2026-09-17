import { describe, expect, it } from 'vitest'
import { getKuisMessage, KUIS_LIST } from './kuisContent'

describe('KUIS_LIST', () => {
  it('berisi 10 soal, masing-masing 4 opsi', () => {
    expect(KUIS_LIST).toHaveLength(10)
    KUIS_LIST.forEach((soal) => {
      expect(soal.opsi).toHaveLength(4)
      expect(soal.benar).toBeGreaterThanOrEqual(0)
      expect(soal.benar).toBeLessThan(4)
    })
  })
})

describe('getKuisMessage', () => {
  it('mengembalikan pesan tinggi untuk skor >= 80%', () => {
    expect(getKuisMessage(80)).toBe('Keren! Kamu sudah sangat paham ciri keaslian dan cara merawat uang rupiah.')
    expect(getKuisMessage(100)).toContain('Keren!')
  })

  it('mengembalikan pesan sedang untuk skor 50-79%', () => {
    expect(getKuisMessage(50)).toContain('Lumayan!')
    expect(getKuisMessage(79)).toContain('Lumayan!')
  })

  it('mengembalikan pesan rendah untuk skor < 50%', () => {
    expect(getKuisMessage(49)).toContain('Yuk pelajari lagi')
    expect(getKuisMessage(0)).toContain('Yuk pelajari lagi')
  })
})
