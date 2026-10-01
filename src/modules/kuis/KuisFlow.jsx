import { Button, Chip, ProgressCircle } from '@heroui/react'
import { Repeat2, Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AnswerCard from '../../components/AnswerCard'
import AnswerFeedback from '../../components/AnswerFeedback'
import ProductTour from '../../components/ProductTour'
import ProgressDots from '../../components/ProgressDots'
import ReviewDisclosure from '../../components/ReviewDisclosure'
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

// Cincin skor — HeroUI ProgressCircle (role="progressbar") yang diperbesar
// dan diwarnai sesuai modul, dengan persentase di tengah.
function ScoreRing({ percent }) {
  return (
    <div className="relative h-[132px] w-[132px]">
      <ProgressCircle
        aria-label="Persentase pemahaman"
        value={percent}
        className="size-full [--progress-circle-track-stroke:#FECDD3] [&_.progress-circle__fill-circle]:[transition-duration:1s]"
      >
        <ProgressCircle.Track className="size-full">
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <p aria-hidden="true" className="number-pop pointer-events-none absolute inset-0 flex items-center justify-center text-3xl font-black text-slate-900">
        {percent}%
      </p>
    </div>
  )
}

function KuisFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)
  const [review, setReview] = useState([])
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
  }

  const starCount = percent >= 80 ? 3 : percent >= 50 ? 2 : 1

  return (
    <div
      className="relative mx-auto w-full max-w-[900px] rounded-[24px] border border-rose-100 bg-white/95 p-5 shadow-xl shadow-rose-200/50 backdrop-blur-sm sm:rounded-[28px] sm:p-8 lg:p-10"
      data-tour="kuis-panel"
    >
      <button
        type="button"
        onClick={tour.restart}
        className="-mt-2 mb-2 ml-auto flex min-h-[44px] w-fit items-center gap-1.5 px-1 text-[13px] font-semibold text-slate-500 transition hover:text-[#E11D48]"
      >
        <Repeat2 size={13} aria-hidden="true" />
        Lihat panduan lagi
      </button>
      {selesai ? (
        <div className="relative flex flex-col items-center gap-4 overflow-hidden text-center" data-testid="kuis-selesai">
          {isVictory && (
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

          <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Skor: {state.correctCount}/{TOTAL} · {percent}% paham
          </p>
          <p className="max-w-sm text-slate-600">{getKuisMessage(percent)}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary" className="btn-cta w-full shadow-lg shadow-rose-500/30 sm:w-auto" onPress={handleRestart}>
              ↻ Ulangi
            </Button>
          </div>

          <ReviewDisclosure
            labelOpen="Lihat pembahasan tiap soal"
            items={review.map((item, i) => ({
              key: i,
              benar: item.benar,
              title: `Soal ${item.soalIndex + 1}: ${KUIS_LIST[item.soalIndex].soal}`,
              body: KUIS_LIST[item.soalIndex].penjelasan,
            }))}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5" data-testid="kuis-content" data-tour="kuis-panel">
          <ProgressDots total={TOTAL} current={state.index} accent="mawar" variant="flat" tone="light" />

          <div className="flex flex-col gap-2 sm:gap-3">
            <Chip color="accent" variant="soft" size="sm" className="w-fit font-black tracking-widest uppercase">
              Soal {state.index + 1} dari {TOTAL}
            </Chip>
            <p className="text-lg leading-snug font-extrabold text-slate-900 sm:text-xl">{soal.soal}</p>
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
            <AnswerFeedback
              benar={opsi[state.selected].benar}
              title={opsi[state.selected].benar ? 'Tepat!' : 'Belum tepat'}
              text={soal.penjelasan}
              koraMessage={opsi[state.selected].benar ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
              nextLabel={state.index === TOTAL - 1 ? 'Lihat skor' : 'Soal Berikutnya'}
              onNext={handleNext}
            />
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
