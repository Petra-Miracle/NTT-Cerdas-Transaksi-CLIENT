function ProgressDots({ total, current, label }) {
  return (
    <div className="flex items-center justify-center gap-2" role="img" aria-label={label ?? `Langkah ${current + 1} dari ${total}`}>
      {Array.from({ length: total }, (_, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'upcoming'
        return <span key={index} className="progress-dot" data-state={state} aria-hidden="true" />
      })}
    </div>
  )
}

export default ProgressDots
