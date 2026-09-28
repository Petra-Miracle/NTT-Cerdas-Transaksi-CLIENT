import { useCallback, useState } from 'react'

const STORAGE_PREFIX = 'ntt_tour_seen_'

function hasSeenTour(tourId) {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + tourId) === 'true'
  } catch {
    return true
  }
}

function markTourSeen(tourId) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + tourId, 'true')
  } catch {
    // localStorage tidak tersedia (mis. mode private) — abaikan, tidak kritis.
  }
}

/**
 * Mengelola state satu product tour: aktif/tidak, langkah saat ini, dan
 * status "sudah pernah dilihat" per tourId di localStorage. Konten tiap
 * langkah (target, judul, deskripsi) dikelola di pemanggil dan dirender
 * lewat komponen <ProductTour />.
 */
export function useProductTour(tourId, stepsLength) {
  const [isActive, setIsActive] = useState(() => stepsLength > 0 && !hasSeenTour(tourId))
  const [stepIndex, setStepIndex] = useState(0)

  const finish = useCallback(() => {
    setIsActive(false)
    markTourSeen(tourId)
  }, [tourId])

  const next = useCallback(() => {
    setStepIndex((current) => {
      const nextIndex = current + 1
      if (nextIndex >= stepsLength) {
        finish()
        return current
      }
      return nextIndex
    })
  }, [stepsLength, finish])

  const prev = useCallback(() => {
    setStepIndex((current) => Math.max(0, current - 1))
  }, [])

  const restart = useCallback(() => {
    setStepIndex(0)
    setIsActive(true)
  }, [])

  return { isActive, stepIndex, next, prev, skip: finish, restart }
}
