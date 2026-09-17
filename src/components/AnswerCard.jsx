function AnswerCard({ label, isAnswered, isSelected, isCorrect, onClick }) {
  let state = {}

  if (isAnswered) {
    if (isCorrect) {
      state['data-correct'] = 'true'
    } else if (isSelected) {
      state['data-incorrect'] = 'true'
    } else {
      state['data-disabled'] = 'true'
    }
  }

  return (
    <button type="button" className="option-card" onClick={onClick} disabled={isAnswered} {...state}>
      <span>{label}</span>
    </button>
  )
}

export default AnswerCard
