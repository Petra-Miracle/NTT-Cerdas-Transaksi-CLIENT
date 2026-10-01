import { ProgressBar } from '@heroui/react'

const ACCENT_VARS = {
  ochre: 'var(--color-ochre)',
  indigo: 'var(--color-indigo)',
  rust: 'var(--color-rust)',
  sage: 'var(--color-sage)',
  oranye: '#E8590C',
  ungu: '#7C5CFF',
  mawar: '#E11D48',
  biru: '#1A5DAD',
}

// Indikator progres langkah/soal — HeroUI ProgressBar (role="progressbar"
// dengan aria-valuenow yang benar). Garis tipis bersegmen menandai tiap
// langkah supaya tetap terasa "per soal" seperti titik-titik versi lama.
function ProgressDots({ total, current, label, accent = 'ochre', variant = 'ring', tone = 'dark' }) {
  const isFlat = variant === 'flat'
  const ariaLabel = label ?? `Langkah ${current + 1} dari ${total}`

  return (
    <ProgressBar
      aria-label={ariaLabel}
      value={current + 1}
      minValue={0}
      maxValue={total}
      className={`mx-auto w-full ${isFlat ? 'max-w-none' : 'max-w-[280px]'}${tone === 'light' ? ' progress-light' : ''}`}
      style={{ '--accent': ACCENT_VARS[accent] }}
    >
      <ProgressBar.Track className="relative h-2.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,white)]">
        <ProgressBar.Fill className="rounded-full bg-[var(--accent)] transition-[width] duration-500 ease-out" />
        {/* Pemisah segmen per langkah */}
        <span className="pointer-events-none absolute inset-0 flex" aria-hidden="true">
          {Array.from({ length: total }, (_, index) => (
            <span key={index} className="h-full flex-1 border-r-2 border-white last:border-r-0" />
          ))}
        </span>
      </ProgressBar.Track>
    </ProgressBar>
  )
}

export default ProgressDots
