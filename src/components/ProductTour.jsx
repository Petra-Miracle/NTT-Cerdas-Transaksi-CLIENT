import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const SPOTLIGHT_PADDING = 8
const TOOLTIP_WIDTH = 320

function getTargetRect(target) {
  if (!target) return null
  const el = document.querySelector(`[data-tour="${target}"]`)
  return el ? el.getBoundingClientRect() : null
}

function ProductTour({ steps, stepIndex, isActive, onNext, onPrev, onSkip }) {
  const [rect, setRect] = useState(null)
  const step = isActive ? steps[stepIndex] : null

  useEffect(() => {
    if (!step) return undefined

    const el = step.target ? document.querySelector(`[data-tour="${step.target}"]`) : null
    if (typeof el?.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const update = () => setRect(getTargetRect(step.target))
    update()
    const settleTimer = setTimeout(update, 300)
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('resize', update)
    }
  }, [step])

  useEffect(() => {
    if (!step) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, onSkip])

  if (!step) return null

  const isFirst = stepIndex === 0
  const isLast = stepIndex === steps.length - 1

  const spotlightStyle = rect
    ? {
        top: rect.top - SPOTLIGHT_PADDING,
        left: rect.left - SPOTLIGHT_PADDING,
        width: rect.width + SPOTLIGHT_PADDING * 2,
        height: rect.height + SPOTLIGHT_PADDING * 2,
      }
    : { top: 0, left: 0, width: 0, height: 0, borderRadius: 0 }

  let tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  if (rect) {
    const spaceBelow = window.innerHeight - rect.bottom
    const showBelow = spaceBelow > 200
    const top = showBelow ? rect.bottom + 16 : undefined
    const bottom = showBelow ? undefined : window.innerHeight - rect.top + 16
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - TOOLTIP_WIDTH - 16)
    tooltipStyle = { top, bottom, left }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9998]"
      role="dialog"
      aria-modal="true"
      aria-label={step.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onSkip()
      }}
    >
      <div className="tour-spotlight" style={spotlightStyle} aria-hidden="true" />

      <div className="fade-scale-in tour-tooltip" style={tooltipStyle}>
        <p className="text-[11px] font-semibold tracking-wide text-[var(--color-ochre)] uppercase">
          Langkah {stepIndex + 1} dari {steps.length}
        </p>
        <h4 className="mt-1 text-base font-bold text-white">{step.title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">{step.desc}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            className="text-xs font-medium text-[var(--color-ink-on-bg-muted)] hover:text-white"
            onClick={onSkip}
          >
            Lewati
          </button>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button type="button" className="btn-ghost !px-3 !py-1.5 !text-xs" onClick={onPrev}>
                Sebelumnya
              </button>
            )}
            <button type="button" className="btn-primary !px-3 !py-1.5 !text-xs" onClick={onNext}>
              {isLast ? 'Selesai' : 'Lanjut'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ProductTour
