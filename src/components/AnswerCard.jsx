import { CircleCheck, CircleX } from 'lucide-react'

function AnswerCard({ label, isAnswered, isSelected, isCorrect, onClick, tone = 'dark' }) {
  const isLight = tone === 'light'
  const isRose = tone === 'rose'
  const isBiru = tone === 'biru'
  const isColored = isLight || isRose || isBiru
  const idleIndicator =
    (isLight && 'answer-indicator-light') ||
    (isRose && 'answer-indicator-rose') ||
    (isBiru && 'answer-indicator-biru') ||
    'option-indicator'
  const idleCard =
    (isLight && 'answer-card-light') || (isRose && 'answer-card-rose') || (isBiru && 'answer-card-biru') || 'answer-card'
  let state = {}
  let icon = <span className={idleIndicator} aria-hidden="true" />

  if (isAnswered) {
    if (isCorrect) {
      state['data-correct'] = 'true'
      icon = (
        <CircleCheck
          size={20}
          className={`shrink-0 ${isColored ? 'text-emerald-600' : 'text-[var(--color-sage)]'}`}
          aria-hidden="true"
        />
      )
    } else if (isSelected) {
      state['data-incorrect'] = 'true'
      icon = (
        <CircleX
          size={20}
          className={`shrink-0 ${isColored ? 'text-red-500' : 'text-[var(--color-danger)]'}`}
          aria-hidden="true"
        />
      )
    } else {
      state['data-disabled'] = 'true'
    }
  }

  return (
    <button
      type="button"
      className={idleCard}
      onClick={onClick}
      disabled={isAnswered}
      {...state}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default AnswerCard
