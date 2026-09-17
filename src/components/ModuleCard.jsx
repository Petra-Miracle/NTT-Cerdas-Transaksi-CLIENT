import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ACCENT = {
  indigo: {
    border: 'border-[#7C93FF33]',
    index: 'text-[#7C93FFAA]',
    iconWrap: 'bg-[#7C93FF1F] border-[#7C93FF40]',
    icon: 'text-[var(--color-indigo)]',
    eyebrow: 'text-[var(--color-indigo)]',
  },
  rust: {
    border: 'border-[#FF7A5933]',
    index: 'text-[#FF7A59AA]',
    iconWrap: 'bg-[#FF7A591F] border-[#FF7A5940]',
    icon: 'text-[var(--color-rust)]',
    eyebrow: 'text-[var(--color-rust)]',
  },
  sage: {
    border: 'border-[#5CE0B033]',
    index: 'text-[#5CE0B0AA]',
    iconWrap: 'bg-[#5CE0B01F] border-[#5CE0B040]',
    icon: 'text-[var(--color-sage)]',
    eyebrow: 'text-[var(--color-sage)]',
  },
}

function CardInner({ index, Icon, eyebrow, title, desc, ctaLabel, accent }) {
  const a = ACCENT[accent]
  return (
    <>
      <span className={`text-xs font-bold ${a.index}`}>{index}</span>
      <span className={`icon-chip mt-4 h-12 w-12 ${a.iconWrap}`}>
        <Icon className={`h-[22px] w-[22px] ${a.icon}`} aria-hidden="true" />
      </span>
      <p className={`mt-4 text-[11px] font-semibold tracking-wide uppercase ${a.eyebrow}`}>{eyebrow}</p>
      <h2 className="mt-2 text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">{desc}</p>
      <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white">
        {ctaLabel}
        <ArrowRight size={14} aria-hidden="true" />
      </span>
    </>
  )
}

function ModuleCard({ index, Icon, eyebrow, title, desc, ctaLabel, accent, to, onClick, highlighted, cardRef }) {
  const className = `relative flex flex-col rounded-[20px] border bg-white/[0.03] p-7 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.06] ${ACCENT[accent].border} ${
    highlighted ? 'ring-2 ring-[var(--color-ochre)]' : ''
  }`
  const style = highlighted ? { animation: 'onboarding-pulse 1.8s ease-out infinite' } : undefined

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className} style={style} ref={cardRef}>
        <CardInner index={index} Icon={Icon} eyebrow={eyebrow} title={title} desc={desc} ctaLabel={ctaLabel} accent={accent} />
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style} ref={cardRef}>
      <CardInner index={index} Icon={Icon} eyebrow={eyebrow} title={title} desc={desc} ctaLabel={ctaLabel} accent={accent} />
    </button>
  )
}

export default ModuleCard
