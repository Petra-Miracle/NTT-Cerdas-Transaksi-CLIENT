import { ArrowRight, CircleCheck, CircleX, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerCard from '../../components/AnswerCard'
import KoraNote from '../../components/KoraNote'
import ProgressDots from '../../components/ProgressDots'
import { submitProdukLokalAttempt } from '../../services/api'
import {
  KARTU_LIST,
  KORA_PESAN_BENAR,
  KORA_PESAN_SALAH,
  PRODUK_LOKAL_PESAN_BELUM_SEMPURNA,
  PRODUK_LOKAL_PESAN_SEMPURNA,
} from './produkLokalContent'

const TOTAL = KARTU_LIST.length

function createInitialState() {
  return { index: 0, selected: null, score: 0 }
}

function ProdukLokalFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)

  const kartu = KARTU_LIST[state.index]
  const isAnswered = state.selected !== null
  const opsi = [
    { label: '✅ Lokal / Buatan Indonesia', benar: kartu.lokal },
    { label: '❌ Produk Impor', benar: !kartu.lokal },
  ]

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = opsi[optionIndex].benar
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
  }

  if (selesai) {
    const sempurna = state.score === TOTAL
    return (
      <div
        className="panel-glow panel-glow-ochre mx-auto flex w-full flex-col items-center gap-6 p-6 text-center sm:p-12"
        data-testid="produklokal-selesai"
      >
        <p className="text-xs font-semibold tracking-wide text-[var(--color-ink-on-bg-muted)] uppercase">
          Hasil kamu
        </p>
        <p className="text-4xl font-bold text-white">
          {state.score}/{TOTAL} tebakan tepat
        </p>
        <p className="max-w-md text-[var(--color-ink-on-bg-muted)]">
          {sempurna ? PRODUK_LOKAL_PESAN_SEMPURNA : PRODUK_LOKAL_PESAN_BELUM_SEMPURNA}
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
      className="panel-glow panel-glow-ochre mx-auto flex w-full flex-col gap-8 p-6 sm:p-12"
      data-testid="produklokal-panel"
      data-tour="produklokal-panel"
    >
      <ProgressDots total={TOTAL} current={state.index} accent="ochre" />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="icon-chip h-14 w-14 border-none bg-black">
          <ShoppingBag size={26} className="text-[var(--color-ochre)]" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-ochre)] uppercase">
            Kartu {state.index + 1} dari {TOTAL} · {kartu.kategori}
          </p>
          <h3 className="text-xl font-bold text-white">{kartu.nama}</h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">{kartu.deskripsi}</p>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        {opsi.map((item, index) => (
          <AnswerCard
            key={item.label}
            label={item.label}
            isAnswered={isAnswered}
            isSelected={state.selected === index}
            isCorrect={isAnswered && item.benar}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>

      {isAnswered && (
        <div className="fade-scale-in callout-slot mx-auto flex w-full max-w-md flex-col gap-3">
          <div className="flex items-center gap-2.5">
            {opsi[state.selected].benar ? (
              <CircleCheck size={20} className="text-[var(--color-sage)]" aria-hidden="true" />
            ) : (
              <CircleX size={20} className="text-[var(--color-danger)]" aria-hidden="true" />
            )}
            <p
              className="text-base font-bold"
              style={{ color: opsi[state.selected].benar ? 'var(--color-sage)' : 'var(--color-danger)' }}
            >
              {opsi[state.selected].benar ? 'Tebakan tepat!' : 'Belum tepat'}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">{kartu.fakta}</p>
          <KoraNote outcome={opsi[state.selected].benar ? 'correct' : 'incorrect'}>
            {opsi[state.selected].benar ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
          </KoraNote>
          <button type="button" className="btn-primary w-fit self-end" onClick={handleNext}>
            {state.index === TOTAL - 1 ? 'Lihat hasil' : 'Kartu Berikutnya'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProdukLokalFlow
