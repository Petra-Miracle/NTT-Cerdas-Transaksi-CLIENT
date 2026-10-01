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

function ProgressDots({ total, current, label, accent = 'ochre', variant = 'ring', tone = 'dark' }) {
  const isFlat = variant === 'flat'

  return (
    <div
      className={`flex items-center justify-center ${isFlat ? 'gap-1.5' : 'gap-2'}${tone === 'light' ? ' progress-light' : ''}`}
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
