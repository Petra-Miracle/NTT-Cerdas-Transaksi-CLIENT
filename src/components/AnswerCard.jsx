import { CircleCheck, CircleX } from 'lucide-react'

function AnswerCard({ label, isAnswered, isSelected, isCorrect, onClick }) {
  let state = {}
  let icon = <span className="option-indicator" aria-hidden="true" />

  if (isAnswered) {
    if (isCorrect) {
      state['data-correct'] = 'true'
      icon = <CircleCheck size={20} className="shrink-0 text-[var(--color-sage)]" aria-hidden="true" />
    } else if (isSelected) {
      state['data-incorrect'] = 'true'
      icon = <CircleX size={20} className="shrink-0 text-[var(--color-danger)]" aria-hidden="true" />
    } else {
      state['data-disabled'] = 'true'
    }
  }

  return (
    <button type="button" className="answer-card" onClick={onClick} disabled={isAnswered} {...state}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default AnswerCard
