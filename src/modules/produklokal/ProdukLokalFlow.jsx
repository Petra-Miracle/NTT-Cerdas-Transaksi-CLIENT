import { Button, Chip, buttonVariants } from '@heroui/react'
import { Coins, Flame } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerCard from '../../components/AnswerCard'
import AnswerFeedback from '../../components/AnswerFeedback'
import ProgressDots from '../../components/ProgressDots'
import ReviewDisclosure from '../../components/ReviewDisclosure'
import { submitProdukLokalAttempt } from '../../services/api'
import { playAww, playYey } from '../../utils/gameSound'
import KartuMotif from './KartuMotif'
import {
  KARTU_LIST,
  KORA_PESAN_BENAR,
  KORA_PESAN_SALAH,
  PRODUK_LOKAL_PESAN_BELUM_SEMPURNA,
  PRODUK_LOKAL_PESAN_SEMPURNA,
} from './produkLokalContent'
import { getTema } from './produkLokalTheme'

const TOTAL = KARTU_LIST.length

function createInitialState() {
  return { index: 0, selected: null, score: 0 }
}

function ProdukLokalFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)
  const [streak, setStreak] = useState(0)
  const [points, setPoints] = useState(0)
  const [review, setReview] = useState([])

  const kartu = KARTU_LIST[state.index]
  const tema = getTema(kartu.id)
  const TemaIcon = tema.Icon
  const isAnswered = state.selected !== null
  const opsi = [
    { label: '✅ Lokal / Buatan Indonesia', benar: kartu.lokal },
    { label: '❌ Produk Impor', benar: !kartu.lokal },
  ]

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = opsi[optionIndex].benar
    const nextStreak = benar ? streak + 1 : 0
    setStreak(nextStreak)
    if (benar) {
      // +100 per tebakan tepat, bonus +25 per beruntun.
      setPoints((prev) => prev + 100 + 25 * (nextStreak - 1))
      playYey()
    } else {
      playAww()
    }
    setReview((prev) => [...prev, { kartuIndex: state.index, benar }])
    setState((prev) => ({ ...prev, selected: optionIndex, score: prev.score + (benar ? 1 : 0) }))
  }

  const handleNext = () => {
    if (state.index === TOTAL - 1) {
      submitProdukLokalAttempt({ correctCount: state.score, totalCount: TOTAL })
      setSelesai(true)
      return
    }
    setState((prev) => ({ ...prev, index: prev.index + 1, selected: null }))
  }

  const handleRestart = () => {
    setState(createInitialState())
    setSelesai(false)
    setStreak(0)
    setPoints(0)
    setReview([])
  }

  if (selesai) {
    const sempurna = state.score === TOTAL
    return (
      <div
        className="mx-auto flex w-full flex-col items-center gap-5 rounded-[24px] border border-blue-100 bg-white/95 p-5 text-center shadow-xl shadow-blue-200/50 backdrop-blur-sm sm:gap-6 sm:rounded-[28px] sm:p-10 lg:p-12"
        data-testid="produklokal-selesai"
      >
        <Chip color="accent" variant="soft" className="font-black tracking-widest uppercase">Hasil kamu</Chip>
        <p className="number-pop text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {state.score}/{TOTAL} tebakan tepat
        </p>
        <Chip color="warning" variant="soft" size="lg" className="gap-1.5 font-black">
          <Coins size={16} aria-hidden="true" />
          {points} poin
        </Chip>
        <p className="max-w-md text-slate-600">
          {sempurna ? PRODUK_LOKAL_PESAN_SEMPURNA : PRODUK_LOKAL_PESAN_BELUM_SEMPURNA}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button variant="primary" className="btn-cta w-full shadow-lg shadow-blue-500/30 sm:w-auto" onPress={handleRestart}>
            ↻ Ulangi
          </Button>
          <Link to="/" className={buttonVariants({ variant: 'outline', className: 'btn-cta btn-accent-outline w-full sm:w-auto' })}>
            Kembali ke beranda
          </Link>
        </div>

        <ReviewDisclosure
          labelOpen="Lihat pembahasan tiap kartu"
          items={review.map((item, i) => ({
            key: i,
            benar: item.benar,
            title: `Kartu ${item.kartuIndex + 1}: ${KARTU_LIST[item.kartuIndex].nama}`,
            body: KARTU_LIST[item.kartuIndex].fakta,
          }))}
        />
      </div>
    )
  }

  const answeredCorrect = isAnswered && opsi[state.selected].benar

  return (
    <div
      className="mx-auto flex w-full flex-col gap-5 rounded-[24px] border border-blue-100 bg-white/95 p-5 shadow-xl shadow-blue-200/50 backdrop-blur-sm sm:gap-6 sm:rounded-[28px] sm:p-8 lg:p-10"
      data-testid="produklokal-panel"
      data-tour="produklokal-panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-[160px] flex-1">
          <ProgressDots total={TOTAL} current={state.index} accent="biru" tone="light" variant="flat" />
        </div>
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <Chip color="danger" variant="soft" size="sm" className="fade-scale-in gap-1 font-black">
              <Flame size={13} aria-hidden="true" />
              Beruntun x{streak}!
            </Chip>
          )}
          <Chip color="warning" variant="soft" size="sm" className="gap-1 font-black" aria-live="polite" aria-label={`${points} poin`}>
            <Coins size={13} aria-hidden="true" />
            {points}
          </Chip>
        </div>
      </div>

      {/* Kartu tematik sesuai produk */}
      <div
        key={kartu.id}
        className={`fade-scale-in relative overflow-hidden rounded-[20px] p-5 text-center shadow-lg sm:p-8 ${
          isAnswered ? (answeredCorrect ? 'card-glow-correct' : 'card-shake') : ''
        }`}
        style={{ background: tema.gradient }}
      >
        <KartuMotif motif={tema.motif} />
        <div className="relative flex flex-col items-center gap-2.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40 sm:h-14 sm:w-14">
            <TemaIcon size={24} className="text-white" aria-hidden="true" />
          </span>
          <p className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-widest uppercase ${tema.chip}`}>
            Kartu {state.index + 1} dari {TOTAL} · {kartu.kategori}
          </p>
          <h3 className="text-2xl font-black tracking-tight text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.35)] sm:text-[28px]">{kartu.nama}</h3>
          <p className="max-w-md rounded-xl bg-black/20 px-3 py-2 text-[15px] leading-relaxed text-white backdrop-blur-[2px]">{kartu.deskripsi}</p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        {opsi.map((item, index) => (
          <AnswerCard
            key={item.label}
            tone="biru"
            label={item.label}
            isAnswered={isAnswered}
            isSelected={state.selected === index}
            isCorrect={isAnswered && item.benar}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>

      {isAnswered && (
        <div className="mx-auto w-full max-w-md">
          <AnswerFeedback
            benar={answeredCorrect}
            title={answeredCorrect ? `Tebakan tepat! +${100 + 25 * (streak - 1)} poin` : 'Belum tepat'}
            text={kartu.fakta}
            koraMessage={answeredCorrect ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
            nextLabel={state.index === TOTAL - 1 ? 'Lihat hasil' : 'Kartu Berikutnya'}
            onNext={handleNext}
          />
        </div>
      )}
    </div>
  )
}

export default ProdukLokalFlow
