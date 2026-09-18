import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MIN_LOADING_MS = 450

/**
 * Delays rendering the new route's content until at least MIN_LOADING_MS
 * after navigation starts, so <LoadingScreen /> genuinely gates the next
 * page's mount instead of just overlaying already-rendered content.
 * `displayedLocation === null` forces the loading state on first render too.
 */
export function usePageTransition() {
  const location = useLocation()
  const [displayedLocation, setDisplayedLocation] = useState(null)
  const isLoading = displayedLocation === null || displayedLocation.pathname !== location.pathname

  useEffect(() => {
    if (!isLoading) return undefined
    const timer = setTimeout(() => setDisplayedLocation(location), MIN_LOADING_MS)
    return () => clearTimeout(timer)
  }, [isLoading, location])

  return { isLoading, displayedLocation: displayedLocation ?? location }
}
