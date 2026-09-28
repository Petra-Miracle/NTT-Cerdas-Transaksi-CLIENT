import { ArrowRight, Bell, CircleCheck, CircleX, Phone, QrCode, ScanLine, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerCard from '../../components/AnswerCard'
import ProgressDots from '../../components/ProgressDots'
import { submitSkenarioAttempt } from '../../services/api'
import { shuffleArray } from '../../utils/shuffle'
import {
  HAK_KONSUMEN_DIGITAL,
  KANAL_PENGADUAN_RESMI,
  SKENARIO_LIST,
  SKENARIO_PESAN_BELUM_SEMPURNA,
  SKENARIO_PESAN_SEMPURNA,
} from './keamananContent'

const TOTAL = SKENARIO_LIST.length
const SKENARIO_ICONS = [QrCode, Bell, ScanLine]

function createInitialState() {
  return { index: 0, selected: null, score: 0 }
}

function KeamananFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)

  const skenario = SKENARIO_LIST[state.index]
  const ScenarioIcon = SKENARIO_ICONS[state.index]
  const isAnswered = state.selected !== null
  const opsi = useMemo(() => shuffleArray(skenario.opsi), [skenario])

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    const benar = opsi[optionIndex].benar
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
      <div className="mx-auto flex w-full flex-col gap-6">
        <div
          className="panel-glow panel-glow-rust flex w-full flex-col items-center gap-6 p-6 text-center sm:p-12"
          data-testid="skenario-selesai"
        >
          <p className="text-xs font-semibold tracking-wide text-[var(--color-ink-on-bg-muted)] uppercase">
            Hasil kamu
          </p>
          <p className="text-4xl font-bold text-white">
            {state.score}/{TOTAL} jawaban tepat di percobaan pertama
          </p>
          <p className="max-w-md text-[var(--color-ink-on-bg-muted)]">
            {sempurna ? SKENARIO_PESAN_SEMPURNA : SKENARIO_PESAN_BELUM_SEMPURNA}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn-primary-rust" onClick={handleRestart}>
              ↻ Ulangi
            </button>
            <Link to="/" className="btn-ghost">
              Kembali ke beranda
            </Link>
          </div>
        </div>

        <div
          className="panel-glow panel-glow-neutral flex w-full flex-col gap-6 p-6 text-left sm:p-10"
          data-testid="perlindungan-konsumen"
        >
          <div className="flex items-center gap-2.5">
            <span className="icon-chip h-10 w-10 border-none bg-white/10">
              <ShieldCheck size={20} className="text-[var(--color-sage)]" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-bold text-white">Kamu Punya Hak sebagai Konsumen Digital</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HAK_KONSUMEN_DIGITAL.map((hak) => (
              <div key={hak.judul} className="flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{hak.judul}</p>
                <p className="text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">{hak.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
            <p className="text-xs font-semibold tracking-wide text-[var(--color-ink-on-bg-muted)] uppercase">
              Merasa dirugikan? Ini kanal pengaduan resminya
            </p>
            {KANAL_PENGADUAN_RESMI.map((kanal) => (
              <div key={kanal.nama} className="flex items-start gap-3">
                <span className="icon-chip h-9 w-9 shrink-0 border-none bg-white/10">
                  <Phone size={16} className="text-[var(--color-ochre)]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {kanal.nama} · <span className="text-[var(--color-ochre)]">{kanal.kontak}</span>
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">{kanal.desc}</p>
                </div>
              </div>
            ))}
            <p className="text-[11px] italic text-[var(--color-ink-on-bg-muted)]">
              Bisa juga hubungi langsung bank atau penyedia QRIS yang kamu pakai untuk kasus yang lebih spesifik.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="panel-glow panel-glow-rust mx-auto flex w-full flex-col gap-8 p-6 sm:p-12"
      data-testid="skenario-panel"
      data-tour="keamanan-panel"
    >
      <ProgressDots total={TOTAL} current={state.index} accent="rust" />

      <div className="flex items-start gap-5">
        <span className="icon-chip h-14 w-14 border-none bg-black">
          <ScenarioIcon size={26} className="text-[var(--color-rust)]" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-rust)] uppercase">
            Skenario {state.index + 1} dari {TOTAL}
          </p>
          <p className="text-[17px] leading-relaxed font-medium text-white">{skenario.cerita}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
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
        <div className="callout-slot flex flex-col gap-3">
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
              {opsi[state.selected].benar ? 'Tepat sekali!' : 'Belum tepat'}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">
            {opsi[state.selected].feedback}
          </p>
          <button type="button" className="btn-primary-rust w-fit self-end" onClick={handleNext}>
            {state.index === TOTAL - 1 ? 'Lihat hasil' : 'Skenario Berikutnya'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default KeamananFlow
