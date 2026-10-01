import { Button, Card, Chip, Separator, buttonVariants } from '@heroui/react'
import { Bell, Phone, QrCode, ScanLine, ShieldCheck, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AmbientToggle from '../../components/AmbientToggle'
import AnswerCard from '../../components/AnswerCard'
import AnswerFeedback from '../../components/AnswerFeedback'
import ProgressDots from '../../components/ProgressDots'
import { useSoundLoop } from '../../hooks/useSoundLoop'
import { startAmbient, stopAmbient } from '../../utils/ambientSound'
import { startAction, stopAction } from '../../utils/actionSound'
import { speakScenario, stopNarration } from '../../utils/narration'
import { submitSkenarioAttempt } from '../../services/api'
import { shuffleArray } from '../../utils/shuffle'
import {
  HAK_KONSUMEN_DIGITAL,
  KANAL_PENGADUAN_RESMI,
  KORA_PESAN_BENAR,
  KORA_PESAN_SALAH,
  SKENARIO_PESAN_BELUM_SEMPURNA,
  SKENARIO_PESAN_SEMPURNA,
} from './keamananContent'
import { SKENARIO_MICROCOPY } from './keamananMicrocopy'

const TOTAL = Object.keys(SKENARIO_MICROCOPY).length
const SKENARIO_ICONS = [QrCode, Bell, ScanLine]

function createInitialState() {
  return { index: 0, selected: null, score: 0 }
}

function KeamananFlow() {
  const [state, setState] = useState(createInitialState)
  const [selesai, setSelesai] = useState(false)

  // Mode jawab: loop tegang ala kasus penipuan beneran. Mode hasil: musik
  // ceria lagi. Keduanya 40%.
  const [soundOn, setSoundOn] = useSoundLoop(startAction, stopAction, 0.4, { active: !selesai })
  useSoundLoop(startAmbient, stopAmbient, 0.4, { active: selesai && soundOn })

  const scenario = SKENARIO_MICROCOPY[state.index + 1]
  const ScenarioIcon = SKENARIO_ICONS[state.index]
  const isAnswered = state.selected !== null
  const opsi = useMemo(() => shuffleArray(scenario.opsi), [scenario])

  // Bacakan soal otomatis dengan suara perempuan tiap skenario dibuka.
  useEffect(() => {
    if (selesai || !soundOn) return undefined
    const timer = setTimeout(() => speakScenario(scenario.cerita), 450)
    return () => {
      clearTimeout(timer)
      stopNarration()
    }
  }, [state.index, selesai, soundOn, scenario.cerita])

  useEffect(() => stopNarration, [])

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    stopNarration()
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
    stopNarration()
    setState(createInitialState())
    setSelesai(false)
  }

  const toggleSound = () => {
    stopNarration()
    setSoundOn((prev) => !prev)
  }

  if (selesai) {
    const sempurna = state.score === TOTAL
    return (
      <>
        <div className="mx-auto flex w-full flex-col gap-6">
          <div
            className="flex w-full flex-col items-center gap-5 rounded-[24px] border border-violet-100 bg-white/95 p-5 text-center shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:gap-6 sm:rounded-[28px] sm:p-10 lg:p-12"
            data-testid="skenario-selesai"
          >
            <Chip color="accent" variant="soft" className="font-black tracking-widest uppercase">Hasil kamu</Chip>
            <p className="number-pop max-w-lg text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl">
              {state.score}/{TOTAL} jawaban tepat di percobaan pertama
            </p>
            <p className="max-w-md text-slate-600">
              {sempurna ? SKENARIO_PESAN_SEMPURNA : SKENARIO_PESAN_BELUM_SEMPURNA}
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button variant="primary" className="btn-cta w-full shadow-lg shadow-violet-500/30 sm:w-auto" onPress={handleRestart}>
                ↻ Ulangi
              </Button>
              <Link to="/" className={buttonVariants({ variant: 'outline', className: 'btn-cta btn-accent-outline w-full sm:w-auto' })}>
                Kembali ke beranda
              </Link>
            </div>
          </div>

          <Card
            className="flex w-full flex-col gap-5 rounded-[24px] border border-violet-100 bg-white/95 p-5 text-left shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:gap-6 sm:rounded-[28px] sm:p-10"
            data-testid="perlindungan-konsumen"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <ShieldCheck size={20} className="text-emerald-600" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">Kamu Punya Hak sebagai Konsumen Digital</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {HAK_KONSUMEN_DIGITAL.map((hak) => (
                <Card key={hak.judul} variant="secondary" className="gap-1.5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 shadow-none">
                  <Card.Title className="text-sm font-semibold text-slate-900">{hak.judul}</Card.Title>
                  <Card.Description className="text-sm leading-relaxed text-slate-600">{hak.desc}</Card.Description>
                </Card>
              ))}
            </div>

            <Separator className="bg-violet-100" />

            <div className="flex flex-col gap-3">
              <p className="text-xs font-black tracking-widest text-slate-500 uppercase">
                Merasa dirugikan? Ini kanal pengaduan resminya
              </p>
              {KANAL_PENGADUAN_RESMI.map((kanal) => (
                <div key={kanal.nama} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <Phone size={16} className="text-[#E8590C]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {kanal.nama} · <span className="text-[#E8590C]">{kanal.kontak}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">{kanal.desc}</p>
                  </div>
                </div>
              ))}
              <p className="text-[13px] leading-relaxed text-slate-500 italic">
                Bisa juga hubungi langsung bank atau penyedia QRIS yang kamu pakai untuk kasus yang lebih spesifik.
              </p>
            </div>
          </Card>
        </div>

        <AmbientToggle on={soundOn} onToggle={toggleSound} />
      </>
    )
  }

  return (
    <>
      <div
        className="mx-auto flex w-full flex-col gap-6 rounded-[24px] border border-violet-100 bg-white/95 p-5 shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:gap-8 sm:rounded-[28px] sm:p-8 lg:p-12"
        data-testid="skenario-panel"
        data-tour="keamanan-panel"
      >
        <ProgressDots total={TOTAL} current={state.index} accent="ungu" tone="light" />

        {/* Mobile: ikon + label sebaris, cerita selebar kartu. Desktop: ikon jadi kolom kiri. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 sm:items-start sm:gap-x-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7C5CFF] shadow-lg shadow-violet-500/30 sm:row-span-3 sm:h-14 sm:w-14">
            <ScenarioIcon size={24} className="text-white" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-xs font-black tracking-widest text-[#7C5CFF] uppercase">
              Skenario {state.index + 1} dari {TOTAL}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => speakScenario(scenario.cerita)}
              className="h-11 bg-[var(--accent-soft)] px-4 font-bold text-[var(--accent-soft-foreground)] hover:bg-[var(--accent-soft-hover)]"
              aria-label="Dengarkan lagi soal ini"
            >
              <Volume2 size={14} aria-hidden="true" />
              Dengarkan
            </Button>
          </div>
          <p className="col-span-2 rounded-lg border-l-4 border-violet-300 bg-violet-50 px-3 py-2 text-sm text-slate-600 italic sm:col-span-1 sm:col-start-2">
            {scenario.konteks}
          </p>
          <p
            key={state.index}
            className="fade-scale-in col-span-2 text-[17px] leading-relaxed font-semibold text-slate-900 sm:col-span-1 sm:col-start-2 sm:text-lg"
          >
            {scenario.cerita}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {opsi.map((item, index) => (
            <AnswerCard
              key={item.label}
              tone="light"
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
            title={opsi[state.selected].benar ? 'Tepat sekali!' : 'Belum tepat'}
            text={opsi[state.selected].feedback}
            koraMessage={opsi[state.selected].benar ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
            detail={opsi[state.selected].detail}
            nextLabel={state.index === TOTAL - 1 ? 'Lihat hasil' : 'Skenario Berikutnya'}
            onNext={handleNext}
          />
        )}
      </div>

      <AmbientToggle on={soundOn} onToggle={toggleSound} />
    </>
  )
}

export default KeamananFlow
