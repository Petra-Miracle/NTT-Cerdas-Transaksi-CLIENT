import { useState } from 'react'

const STORAGE_KEY = 'ntt_onboarding_seen'

function readSeen() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return true
  }
}

export function useOnboarding() {
  const [seen, setSeen] = useState(readSeen)

  const markSeen = () => {
    setSeen(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // localStorage tidak tersedia (mis. mode private) — abaikan, tidak kritis.
    }
  }

  return { showOnboarding: !seen, markSeen }
}
