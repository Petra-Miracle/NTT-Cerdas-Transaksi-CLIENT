import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerCard from '../../components/AnswerCard'
import ProgressDots from '../../components/ProgressDots'
import { submitSkenarioAttempt } from '../../services/api'
import { SKENARIO_LIST, SKENARIO_PESAN_BELUM_SEMPURNA, SKENARIO_PESAN_SEMPURNA } from './keamananContent'

const TOTAL = SKENARIO_LIST.length

function createInitialState() {
  return { index: 0, selected: null, score: 0 }
}

function KeamananFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)

  const skenario = SKENARIO_LIST[state.index]
  const isAnswered = state.selected !== null

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = skenario.opsi[optionIndex].benar
    setState((prev) => ({ ...prev, selected: optionIndex, score: prev.score + (benar ? 1 : 0) }))
  }

  const handleNext = () => {
    if (state.index === TOTAL - 1) {
      submitSkenarioAttempt({ correctCount: state.score, totalCount: TOTAL })
      setSelesai(true)
      return
    }
    setState((prev) => ({ ...prev, index: prev.index + 1, selected: null }))
  }

  const handleRestart = () => {
    setState(createInitialState())
    setSelesai(false)
  }

  if (selesai) {
    const sempurna = state.score === TOTAL
    return (
      <div
        className="panel-glow panel-glow-rust mx-auto flex w-full max-w-[720px] flex-col items-center gap-6 p-6 text-center sm:p-10"
        data-testid="skenario-selesai"
      >
        <p className="text-sm uppercase tracking-wide text-[var(--color-ink-on-bg-muted)]">Hasil kamu</p>
        <p className="text-4xl font-bold text-white">
          {state.score}/{TOTAL} jawaban tepat di percobaan pertama
        </p>
        <p className="max-w-md text-[var(--color-ink-on-bg)]">
          {sempurna ? SKENARIO_PESAN_SEMPURNA : SKENARIO_PESAN_BELUM_SEMPURNA}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn-primary" onClick={handleRestart}>
            ↻ Ulangi
          </button>
          <Link to="/" className="btn-ghost">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="panel-glow panel-glow-rust mx-auto flex w-full max-w-[720px] flex-col gap-6 p-6 sm:p-10"
      data-testid="skenario-panel"
    >
      <ProgressDots total={TOTAL} current={state.index} />

      <p className="text-lg leading-relaxed text-white">{skenario.cerita}</p>

      <div className="flex flex-col gap-3">
        {skenario.opsi.map((opsi, index) => (
          <AnswerCard
            key={index}
            label={opsi.label}
            isAnswered={isAnswered}
            isSelected={state.selected === index}
            isCorrect={isAnswered && opsi.benar}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>

      {isAnswered && (
        <div className="feedback-box" data-correct={skenario.opsi[state.selected].benar}>
          <p className="font-semibold">{skenario.opsi[state.selected].benar ? 'Tepat!' : 'Belum tepat.'}</p>
          <p className="mt-1">{skenario.opsi[state.selected].feedback}</p>
          <button type="button" className="btn-primary mt-4" onClick={handleNext}>
            {state.index === TOTAL - 1 ? 'Lihat hasil' : 'Lanjut'}
          </button>
        </div>
      )}
    </div>
  )
}

export default KeamananFlow
