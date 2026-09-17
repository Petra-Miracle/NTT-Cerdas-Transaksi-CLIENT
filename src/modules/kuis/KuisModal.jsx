import { ArrowRight, CircleCheck, CircleX } from 'lucide-react'
import { useState } from 'react'
import AnswerCard from '../../components/AnswerCard'
import Modal from '../../components/Modal'
import ProgressDots from '../../components/ProgressDots'
import { submitKuisAttempt } from '../../services/api'
import { getKuisMessage, KUIS_LIST } from './kuisContent'

const TOTAL = KUIS_LIST.length
const TITLE_ID = 'kuis-modal-title'

function createInitialState() {
  return { index: 0, selected: null, correctCount: 0 }
}

function KuisModal({ isOpen, onClose }) {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)

  const handleClose = () => {
    onClose()
    // Kuis selalu mulai ulang dari soal 1 tiap kali pop-up dibuka.
    setState(createInitialState())
    setSelesai(false)
  }

  const soal = KUIS_LIST[state.index]
  const isAnswered = state.selected !== null

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = optionIndex === soal.benar
    setState((prev) => ({ ...prev, selected: optionIndex, correctCount: prev.correctCount + (benar ? 1 : 0) }))
  }

  const handleNext = () => {
    if (state.index === TOTAL - 1) {
      submitKuisAttempt({ correctCount: state.correctCount, totalCount: TOTAL })
      setSelesai(true)
      return
    }
    setState((prev) => ({ ...prev, index: prev.index + 1, selected: null }))
  }

  const percent = Math.round((state.correctCount / TOTAL) * 100)

  return (
    <Modal isOpen={isOpen} onClose={handleClose} titleId={TITLE_ID} panelClassName="panel-glow-neutral">
      <h2 id={TITLE_ID} className="mb-1 text-[26px] font-bold text-white">
        Kuis CBP Rupiah
      </h2>
      <p className="mb-6 text-sm text-[var(--color-ink-on-bg-muted)]">
        10 soal seputar cara mengecek keaslian dan merawat uang rupiah.
      </p>

      {selesai ? (
        <div className="flex flex-col items-center gap-4 text-center" data-testid="kuis-selesai">
          <p className="text-3xl font-bold text-white">
            Skor: {state.correctCount}/{TOTAL} · {percent}% paham
          </p>
          <p className="max-w-sm text-[var(--color-ink-on-bg-muted)]">{getKuisMessage(percent)}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-primary-sage"
              onClick={() => {
                setState(createInitialState())
                setSelesai(false)
              }}
            >
              ↻ Ulangi
            </button>
            <button type="button" className="btn-ghost" onClick={handleClose}>
              Tutup
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5" data-testid="kuis-content">
          <ProgressDots total={TOTAL} current={state.index} accent="sage" variant="flat" />

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--color-sage)] uppercase">
              Soal {state.index + 1} dari {TOTAL}
            </p>
            <p className="text-xl leading-snug font-bold text-white">{soal.soal}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {soal.opsi.map((opsi, index) => (
              <AnswerCard
                key={index}
                label={opsi}
                isAnswered={isAnswered}
                isSelected={state.selected === index}
                isCorrect={isAnswered && index === soal.benar}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>

          {isAnswered && (
            <div className="callout-slot flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {state.selected === soal.benar ? (
                  <CircleCheck size={16} className="text-[var(--color-sage)]" aria-hidden="true" />
                ) : (
                  <CircleX size={16} className="text-[var(--color-danger)]" aria-hidden="true" />
                )}
                <p
                  className="text-sm font-bold"
                  style={{ color: state.selected === soal.benar ? 'var(--color-sage)' : 'var(--color-danger)' }}
                >
                  {state.selected === soal.benar ? 'Tepat!' : 'Belum tepat'}
                </p>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--color-ink-on-bg-muted)]">{soal.penjelasan}</p>
              <button type="button" className="btn-primary-sage w-fit self-end !px-6 !py-3" onClick={handleNext}>
                {state.index === TOTAL - 1 ? 'Lihat skor' : 'Soal Berikutnya'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default KuisModal
