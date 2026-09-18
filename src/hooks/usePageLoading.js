import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LOADING_DURATION_MS = 550

export function usePageLoading() {
  const { pathname } = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => clearTimeout(timer)
  }, [pathname])

  return isLoading
}
