import { Link } from 'react-router-dom'

const GLOW_STYLES = {
  indigo: 'hover:border-[#7C93FF]/70 hover:shadow-[0_0_0_1px_#7C93FF,0_20px_40px_-20px_#7C93FF]',
  rust: 'hover:border-[#FF7A59]/70 hover:shadow-[0_0_0_1px_#FF7A59,0_20px_40px_-20px_#FF7A59]',
  sage: 'hover:border-[#5CE0B0]/70 hover:shadow-[0_0_0_1px_#5CE0B0,0_20px_40px_-20px_#5CE0B0]',
}

function CardInner({ index, Icon, eyebrow, title, desc, ctaLabel }) {
  return (
    <>
      <span className="text-xs font-semibold text-white/40">{index}</span>
      <Icon className="mt-3 h-8 w-8 text-white" aria-hidden="true" />
      <p className="mt-4 text-xs uppercase tracking-wide text-[var(--color-ink-on-bg-muted)]">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-ink-on-bg-muted)]">{desc}</p>
      <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white">
        {ctaLabel}
      </span>
    </>
  )
}

function ModuleCard({ index, Icon, eyebrow, title, desc, ctaLabel, glow, to, onClick, highlighted, cardRef }) {
  const className = `relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition ${GLOW_STYLES[glow]} ${
    highlighted ? 'ring-2 ring-[var(--color-ochre)]' : ''
  }`
  const style = highlighted ? { animation: 'onboarding-pulse 1.8s ease-out infinite' } : undefined

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className} style={style} ref={cardRef}>
        <CardInner index={index} Icon={Icon} eyebrow={eyebrow} title={title} desc={desc} ctaLabel={ctaLabel} />
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style} ref={cardRef}>
      <CardInner index={index} Icon={Icon} eyebrow={eyebrow} title={title} desc={desc} ctaLabel={ctaLabel} />
    </button>
  )
}

export default ModuleCard
