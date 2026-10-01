import { ArrowRight, Check, ChevronDown, CircleCheck, CircleX, Repeat2, Star, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AnswerCard from '../../components/AnswerCard'
import KoraNote from '../../components/KoraNote'
import ProductTour from '../../components/ProductTour'
import ProgressDots from '../../components/ProgressDots'
import { useProductTour } from '../../hooks/useProductTour'
import { submitKuisAttempt } from '../../services/api'
import { playKoraSound } from '../../utils/koraSound'
import { getResultSound, playFail, playVictory } from '../../utils/gameSound'
import { shuffleArray } from '../../utils/shuffle'
import { getKuisMessage, KORA_PESAN_BENAR, KORA_PESAN_SALAH, KUIS_LIST } from './kuisContent'

const TOTAL = KUIS_LIST.length

const CONFETTI_COLORS = ['#E11D48', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#F97316']

const CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 7 + ((i * 13) % 8),
  delay: `${((i * 13) % 20) / 10}s`,
  duration: `${2.6 + ((i * 7) % 5) * 0.4}s`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  round: i % 3 === 0,
}))

const TOUR_STEPS = [
  {
    target: 'kuis-panel',
    title: 'Cara main Kuis CBP Rupiah',
    desc: 'Pilih salah satu jawaban tiap soal, lihat penjelasannya, lalu lanjut ke soal berikutnya sampai skor akhirmu muncul.',
  },
]

function createInitialState() {
  return { index: 0, selected: null, correctCount: 0 }
}

function ScoreRing({ percent }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative h-[132px] w-[132px]">
      <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
        <circle cx="66" cy="66" r={radius} fill="none" stroke="#FECDD3" strokeWidth="12" />
        <circle
          cx="66"
          cy="66"
          r={radius}
          fill="none"
          stroke="#E11D48"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <p className="number-pop absolute inset-0 flex items-center justify-center text-3xl font-black text-slate-900">
        {percent}%
      </p>
    </div>
  )
}

function KuisFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)
  const [review, setReview] = useState([])
  const [showReview, setShowReview] = useState(false)
  const tour = useProductTour('kuis', TOUR_STEPS.length)

  const percent = Math.round((state.correctCount / TOTAL) * 100)
  const isVictory = selesai && percent >= 80
  const isFail = selesai && percent < 75

  // Bunyi hasil ala game: hore + tepuk tangan bila ≥80%, jingle gagal bila <75%.
  useEffect(() => {
    if (!selesai) return
    const sound = getResultSound(percent)
    if (sound === 'victory') playVictory(0.6)
    else if (sound === 'fail') playFail(0.6)
    else playKoraSound('correct')
  }, [selesai, percent])

  const soal = KUIS_LIST[state.index]
  const isAnswered = state.selected !== null
  const opsi = useMemo(
    () => shuffleArray(soal.opsi.map((label, index) => ({ label, benar: index === soal.benar }))),
    [soal],
  )

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = opsi[optionIndex].benar
    setState((prev) => ({ ...prev, selected: optionIndex, correctCount: prev.correctCount + (benar ? 1 : 0) }))
    setReview((prev) => [...prev, { soalIndex: state.index, benar }])
  }

  const handleNext = () => {
    if (state.index === TOTAL - 1) {
      submitKuisAttempt({ correctCount: state.correctCount, totalCount: TOTAL })
      setSelesai(true)
      return
    }
    setState((prev) => ({ ...prev, index: prev.index + 1, selected: null }))
  }

  const handleRestart = () => {
    setState(createInitialState())
    setSelesai(false)
    setReview([])
    setShowReview(false)
  }

  const starCount = percent >= 80 ? 3 : percent >= 50 ? 2 : 1

  return (
    <div
      className="relative mx-auto w-full max-w-[900px] rounded-[28px] border border-rose-100 bg-white/95 p-6 shadow-xl shadow-rose-200/50 backdrop-blur-sm sm:p-10"
      data-tour="kuis-panel"
    >
      <button
        type="button"
        onClick={tour.restart}
        className="mb-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#E11D48]"
      >
        <Repeat2 size={13} aria-hidden="true" />
        Lihat panduan lagi
      </button>
      {selesai ? (
        <div className="relative flex flex-col items-center gap-4 overflow-hidden text-center" data-testid="kuis-selesai">          {isVictory && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {CONFETTI.map((piece, i) => (
                <span
                  key={i}
                  className="coin-rain absolute -top-4"
                  style={{
                    left: piece.left,
                    width: piece.size,
                    height: piece.size * (piece.round ? 1 : 0.5),
                    background: piece.color,
                    borderRadius: piece.round ? '9999px' : '2px',
                    animationDelay: piece.delay,
                    animationDuration: piece.duration,
                  }}
                />
              ))}
            </div>
          )}
          {isFail && (
            <div className="flex flex-col items-center gap-1" aria-hidden="true">
              <div className="flex items-end">
                <span className="h-10 w-10 rounded-full bg-slate-300" />
                <span className="-mx-3 mb-2 h-12 w-12 rounded-full bg-slate-400" />
                <span className="h-10 w-10 rounded-full bg-slate-300" />
              </div>
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="rain-drop block h-4 w-1 rounded-full bg-sky-400"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <ScoreRing percent={percent} />

          <div className="flex items-center gap-1.5" aria-label={`${starCount} dari 3 bintang`}>
            {[0, 1, 2].map((i) => (
              <Star
                key={i}
                size={30}
                aria-hidden="true"
                className={`number-pop ${i < starCount ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              />
            ))}
          </div>

          <p className="text-3xl font-black tracking-tight text-slate-900">
            Skor: {state.correctCount}/{TOTAL} · {percent}% paham
          </p>
          <p className="max-w-sm text-slate-600">{getKuisMessage(percent)}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E11D48] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition hover:bg-[#BE123C]"
              onClick={handleRestart}
            >
              ↻ Ulangi
            </button>
          </div>

          <button
            type="button"
            aria-expanded={showReview}
            onClick={() => setShowReview((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#E11D48] hover:underline"
          >
            {showReview ? 'Sembunyikan pembahasan' : 'Lihat pembahasan tiap soal'}
            <ChevronDown size={15} aria-hidden="true" className={`transition ${showReview ? 'rotate-180' : ''}`} />
          </button>

          {showReview && (
            <div className="flex w-full flex-col gap-3 text-left">
              {review.map((item, i) => {
                const answered = KUIS_LIST[item.soalIndex]
                return (
                  <div key={i} className="flex items-start gap-2.5 rounded-2xl border border-rose-100 bg-white p-4">
                    {item.benar ? (
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <X size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                    )}
                    <div>
                      <p className="text-[13px] font-bold text-slate-900">
                        Soal {item.soalIndex + 1}: {answered.soal}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{answered.penjelasan}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5" data-testid="kuis-content" data-tour="kuis-panel">
          <ProgressDots total={TOTAL} current={state.index} accent="mawar" variant="flat" tone="light" />

          <div className="flex flex-col gap-3">
            <p className="text-xs font-black tracking-widest text-[#E11D48] uppercase">
              Soal {state.index + 1} dari {TOTAL}
            </p>
            <p className="text-xl leading-snug font-extrabold text-slate-900">{soal.soal}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {opsi.map((item, index) => (
              <AnswerCard
                key={item.label}
                tone="rose"
                label={item.label}
                isAnswered={isAnswered}
                isSelected={state.selected === index}
                isCorrect={isAnswered && item.benar}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>

          {isAnswered && (
            <div className="fade-scale-in flex flex-col gap-3 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                {opsi[state.selected].benar ? (
                  <CircleCheck size={20} className="text-emerald-600" aria-hidden="true" />
                ) : (
                  <CircleX size={20} className="text-red-500" aria-hidden="true" />
                )}
                <p className={`text-base font-bold ${opsi[state.selected].benar ? 'text-emerald-700' : 'text-red-600'}`}>
                  {opsi[state.selected].benar ? 'Tepat!' : 'Belum tepat'}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{soal.penjelasan}</p>
              <KoraNote tone="light" outcome={opsi[state.selected].benar ? 'correct' : 'incorrect'}>
                {opsi[state.selected].benar ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
              </KoraNote>
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center gap-2 self-end rounded-full bg-[#E11D48] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition hover:bg-[#BE123C]"
                onClick={handleNext}
              >
                {state.index === TOTAL - 1 ? 'Lihat skor' : 'Soal Berikutnya'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}

      <ProductTour
        steps={TOUR_STEPS}
        stepIndex={tour.stepIndex}
        isActive={tour.isActive && !selesai}
        onNext={tour.next}
        onPrev={tour.prev}
        onSkip={tour.skip}
      />
    </div>
  )
}

export default KuisFlow
