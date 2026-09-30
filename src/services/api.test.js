import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { submitFeedback, submitPemahamanAttempt } from './api'

describe('api — feedback & pemahaman', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true })))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('submitFeedback mengirim POST JSON ke /api/feedback', () => {
    const payload = { modul: 'keamanan', pemahaman: 4, relevansi: 'ya', komentar: '', laporanKonten: false }
    submitFeedback(payload)

    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, options] = fetch.mock.calls[0]
    expect(url).toMatch(/\/api\/feedback$/)
    expect(options.method).toBe('POST')
    expect(JSON.parse(options.body)).toEqual(payload)
  })

  it('submitPemahamanAttempt mengirim POST JSON ke /api/pemahaman/attempts', () => {
    const payload = { modul: 'keamanan', skorAwal: 1, skorAkhir: 3, totalCount: 3 }
    submitPemahamanAttempt(payload)

    const [url, options] = fetch.mock.calls[0]
    expect(url).toMatch(/\/api\/pemahaman\/attempts$/)
    expect(JSON.parse(options.body)).toEqual(payload)
  })
})
