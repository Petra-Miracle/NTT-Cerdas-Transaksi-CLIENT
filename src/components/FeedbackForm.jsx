import { MessageSquarePlus, Send } from 'lucide-react'
import { useState } from 'react'
import { submitFeedback } from '../services/api'

const RELEVANSI = [
  { value: 'ya', label: 'Ya, relevan' },
  { value: 'sebagian', label: 'Sebagian' },
  { value: 'tidak', label: 'Tidak' },
]

function FeedbackForm({ modul }) {
  const [pemahaman, setPemahaman] = useState(null)
  const [relevansi, setRelevansi] = useState(null)
  const [komentar, setKomentar] = useState('')
  const [laporanKonten, setLaporanKonten] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const canSubmit = pemahaman !== null && relevansi !== null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    submitFeedback({
      modul,
      pemahaman,
      relevansi,
      komentar: komentar.trim(),
      laporanKonten,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="callout-slot text-center" role="status">
        <p className="font-bold text-[var(--color-sage)]">Terima kasih atas masukanmu.</p>
        <p className="mt-1 text-sm text-[var(--color-ink-on-bg-muted)]">
          Jawaban anonim ini membantu kami menyempurnakan edukasi QRIS dan Rupiah untuk UMKM NTT.
        </p>
      </div>
    )
  }

  return (
    <section className="panel-glow panel-glow-neutral flex w-full flex-col gap-5 p-6 sm:p-8" aria-labelledby={`feedback-${modul}`}>
      <div className="flex items-start gap-3">
        <span className="icon-chip h-10 w-10 border-none bg-white/10">
          <MessageSquarePlus size={19} className="text-[var(--color-ochre)]" aria-hidden="true" />
        </span>
        <div>
          <h3 id={`feedback-${modul}`} className="text-lg font-bold text-white">
            Bantu Perbaiki Materi Ini
          </h3>
          <p className="text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">
            Tidak meminta nama atau nomor telepon. Jawab singkat agar materi makin berguna.
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-white">1. Seberapa paham kamu setelah menyelesaikan modul ini?</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tingkat pemahaman">
            {[1, 2, 3, 4, 5].map((nilai) => (
              <label
                key={nilai}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border text-sm font-bold transition ${
                  pemahaman === nilai
                    ? 'border-[var(--color-ochre)] bg-[var(--color-ochre)] text-[var(--color-ochre-text)]'
                    : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <input
                  type="radio"
                  name={`pemahaman-${modul}`}
                  value={nilai}
                  checked={pemahaman === nilai}
                  onChange={() => setPemahaman(nilai)}
                  className="sr-only"
                  aria-label={String(nilai)}
                />
                {nilai}
              </label>
            ))}
          </div>
          <p className="text-xs text-[var(--color-ink-on-bg-muted)]">1 = belum paham, 5 = sangat paham</p>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-white">2. Apakah materi ini relevan dengan kegiatanmu?</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Relevansi materi">
            {RELEVANSI.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition ${
                  relevansi === option.value
                    ? 'border-[var(--color-indigo)] bg-[var(--color-indigo)] text-white'
                    : 'border-white/20 bg-white/5 text-[var(--color-ink-on-bg-muted)] hover:bg-white/10 hover:text-white'
                }`}
              >
                <input
                  type="radio"
                  name={`relevansi-${modul}`}
                  value={option.value}
                  checked={relevansi === option.value}
                  onChange={() => setRelevansi(option.value)}
                  className="sr-only"
                  aria-label={option.label}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor={`komentar-${modul}`} className="text-sm font-semibold text-white">
            3. Bagian apa yang paling membantu atau masih membingungkan? <span className="font-normal text-white/60">(opsional)</span>
          </label>
          <textarea
            id={`komentar-${modul}`}
            rows={3}
            maxLength={500}
            value={komentar}
            onChange={(event) => setKomentar(event.target.value)}
            placeholder="Tulis masukanmu di sini..."
            className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-sm text-white placeholder:text-white/40"
          />
          <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">
            <input
              type="checkbox"
              checked={laporanKonten}
              onChange={(event) => setLaporanKonten(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--color-ochre)]"
            />
            Laporkan informasi yang kurang tepat agar dapat kami tinjau.
          </label>
        </div>

        <button type="submit" className="btn-primary w-fit self-end !px-5 !py-2.5 !text-xs" disabled={!canSubmit}>
          Kirim masukan
          <Send size={14} aria-hidden="true" />
        </button>
      </form>
    </section>
  )
}

export default FeedbackForm
