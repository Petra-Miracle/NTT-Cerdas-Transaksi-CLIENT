const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
const REQUEST_TIMEOUT_MS = 5000

/**
 * Fire-and-forget POST. Analytics failures must never surface to the user
 * or block the UI — the calculator/quiz result is already final locally.
 */
async function postAnalytics(path, payload) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch (error) {
    console.warn(`Analytics ke ${path} gagal dikirim (diabaikan):`, error)
  } finally {
    clearTimeout(timeoutId)
  }
}

export function submitKalkulatorResult(payload) {
  void postAnalytics('/api/kalkulator/submissions', payload)
}

export function submitKuisAttempt(payload) {
  void postAnalytics('/api/kuis/attempts', payload)
}

export function submitSkenarioAttempt(payload) {
  void postAnalytics('/api/skenario/attempts', payload)
}
