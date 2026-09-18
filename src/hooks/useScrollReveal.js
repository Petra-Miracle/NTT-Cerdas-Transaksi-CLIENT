import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it scrolls into view. Falls back to always-visible
 * when IntersectionObserver isn't available (older browsers, jsdom tests),
 * so content is never hidden from users or test queries that can't scroll.
 */
export function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
