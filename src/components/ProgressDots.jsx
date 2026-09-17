const ACCENT_VARS = {
  ochre: 'var(--color-ochre)',
  indigo: 'var(--color-indigo)',
  rust: 'var(--color-rust)',
  sage: 'var(--color-sage)',
}

function ProgressDots({ total, current, label, accent = 'ochre', variant = 'ring' }) {
  const isFlat = variant === 'flat'

  return (
    <div
      className={`flex items-center justify-center ${isFlat ? 'gap-1.5' : 'gap-2'}`}
      style={{ '--dot-accent': ACCENT_VARS[accent] }}
      role="img"
      aria-label={label ?? `Langkah ${current + 1} dari ${total}`}
    >
      {Array.from({ length: total }, (_, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'upcoming'
        return (
          <span
            key={index}
            className={isFlat ? 'progress-dot-flat' : 'progress-dot'}
            data-state={state}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

export default ProgressDots
