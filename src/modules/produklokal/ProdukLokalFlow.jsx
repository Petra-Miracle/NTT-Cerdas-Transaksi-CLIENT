import { ArrowRight, Check, ChevronDown, CircleCheck, CircleX, Coins, Flame, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerCard from '../../components/AnswerCard'
import KoraNote from '../../components/KoraNote'
import ProgressDots from '../../components/ProgressDots'
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
  const [showReview, setShowReview] = useState(false)

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
    setShowReview(false)
  }

  if (selesai) {
    const sempurna = state.score === TOTAL
    return (
      <div
        className="mx-auto flex w-full flex-col items-center gap-6 rounded-[28px] border border-blue-100 bg-white/95 p-6 text-center shadow-xl shadow-blue-200/50 backdrop-blur-sm sm:p-12"
        data-testid="produklokal-selesai"
      >
        <p className="text-xs font-black tracking-widest text-[#1A5DAD] uppercase">Hasil kamu</p>
        <p className="number-pop text-4xl font-black tracking-tight text-slate-900">
          {state.score}/{TOTAL} tebakan tepat
        </p>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-black text-amber-800">
          <Coins size={16} aria-hidden="true" />
          {points} poin
        </p>
        <p className="max-w-md text-slate-600">
          {sempurna ? PRODUK_LOKAL_PESAN_SEMPURNA : PRODUK_LOKAL_PESAN_BELUM_SEMPURNA}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A5DAD] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#144A8C]"
            onClick={handleRestart}
          >
            ↻ Ulangi
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-800 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Kembali ke beranda
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={showReview}
          onClick={() => setShowReview((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1A5DAD] hover:underline"
        >
          {showReview ? 'Sembunyikan pembahasan' : 'Lihat pembahasan tiap kartu'}
          <ChevronDown size={15} aria-hidden="true" className={`transition ${showReview ? 'rotate-180' : ''}`} />
        </button>

        {showReview && (
          <div className="flex w-full flex-col gap-3 text-left">
            {review.map((item, i) => {
              const answered = KARTU_LIST[item.kartuIndex]
              return (
                <div key={i} className="flex items-start gap-2.5 rounded-2xl border border-blue-100 bg-white p-4">
                  {item.benar ? (
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <X size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                  )}
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">
                      Kartu {item.kartuIndex + 1}: {answered.nama}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{answered.fakta}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const answeredCorrect = isAnswered && opsi[state.selected].benar

  return (
    <div
      className="mx-auto flex w-full flex-col gap-6 rounded-[28px] border border-blue-100 bg-white/95 p-6 shadow-xl shadow-blue-200/50 backdrop-blur-sm sm:p-10"
      data-testid="produklokal-panel"
      data-tour="produklokal-panel"
    >
      <div className="flex items-center justify-between gap-3">
        <ProgressDots total={TOTAL} current={state.index} accent="biru" tone="light" />
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <span className="fade-scale-in inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-black text-orange-700">
              <Flame size={13} aria-hidden="true" />
              Beruntun x{streak}!
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-800"
            aria-live="polite"
          >
            <Coins size={13} aria-hidden="true" />
            {points}
          </span>
        </div>
      </div>

      {/* Kartu tematik sesuai produk */}
      <div
        key={kartu.id}
        className={`fade-scale-in relative overflow-hidden rounded-[20px] p-6 text-center shadow-lg sm:p-8 ${
          isAnswered ? (answeredCorrect ? 'card-glow-correct' : 'card-shake') : ''
        }`}
        style={{ background: tema.gradient }}
      >
        <KartuMotif motif={tema.motif} />
        <div className="relative flex flex-col items-center gap-2.5">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40">
            <TemaIcon size={26} className="text-white" aria-hidden="true" />
          </span>
          <p className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-widest uppercase ${tema.chip}`}>
            Kartu {state.index + 1} dari {TOTAL} · {kartu.kategori}
          </p>
          <h3 className="text-2xl font-black tracking-tight text-white drop-shadow">{kartu.nama}</h3>
          <p className="max-w-md text-sm leading-relaxed text-white/90">{kartu.deskripsi}</p>
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
        <div className="fade-scale-in mx-auto flex w-full max-w-md flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
          <div className="flex items-center gap-2.5">
            {answeredCorrect ? (
              <CircleCheck size={20} className="text-emerald-600" aria-hidden="true" />
            ) : (
              <CircleX size={20} className="text-red-500" aria-hidden="true" />
            )}
            <p className={`text-base font-bold ${answeredCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
              {answeredCorrect ? `Tebakan tepat! +${100 + 25 * (streak - 1)} poin` : 'Belum tepat'}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{kartu.fakta}</p>
          <KoraNote tone="light" outcome={answeredCorrect ? 'correct' : 'incorrect'}>
            {answeredCorrect ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
          </KoraNote>
          <button
            type="button"
            className="inline-flex w-fit items-center justify-center gap-2 self-end rounded-full bg-[#1A5DAD] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#144A8C]"
            onClick={handleNext}
          >
            {state.index === TOTAL - 1 ? 'Lihat hasil' : 'Kartu Berikutnya'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProdukLokalFlow
