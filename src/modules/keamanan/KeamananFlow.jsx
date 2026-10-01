import { ArrowRight, Bell, CircleCheck, CircleX, Phone, QrCode, ScanLine, ShieldCheck, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AmbientToggle from '../../components/AmbientToggle'
import AnswerCard from '../../components/AnswerCard'
import KoraNote from '../../components/KoraNote'
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

  // Mode jawab: loop tegang ala kasus penipuan beneran. Mode hasil: musik
  // ceria lagi. Keduanya 40%.
  const [soundOn, setSoundOn] = useSoundLoop(startAction, stopAction, 0.4, { active: !selesai })
  useSoundLoop(startAmbient, stopAmbient, 0.4, { active: selesai && soundOn })

  const skenario = SKENARIO_LIST[state.index]
  const ScenarioIcon = SKENARIO_ICONS[state.index]
  const isAnswered = state.selected !== null
  const opsi = useMemo(() => shuffleArray(skenario.opsi), [skenario])

  // Bacakan soal otomatis dengan suara perempuan tiap skenario dibuka.
  // Rate sedikit cepat (1,15) karena teks skenario cukup panjang.
  useEffect(() => {
    if (selesai || !soundOn) return undefined
    const timer = setTimeout(() => speakScenario(skenario.cerita, { rate: 1.15 }), 450)
    return () => {
      clearTimeout(timer)
      stopNarration()
    }
  }, [state.index, selesai, soundOn, skenario.cerita])

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
            className="flex w-full flex-col items-center gap-6 rounded-[28px] border border-violet-100 bg-white/95 p-6 text-center shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:p-12"
            data-testid="skenario-selesai"
          >
            <p className="text-xs font-black tracking-widest text-[#7C5CFF] uppercase">Hasil kamu</p>
            <p className="number-pop text-4xl font-black tracking-tight text-slate-900">
              {state.score}/{TOTAL} jawaban tepat di percobaan pertama
            </p>
            <p className="max-w-md text-slate-600">
              {sempurna ? SKENARIO_PESAN_SEMPURNA : SKENARIO_PESAN_BELUM_SEMPURNA}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7C5CFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-[#6847E8]"
                onClick={handleRestart}
              >
                ↻ Ulangi
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 bg-white px-6 py-3 text-sm font-bold text-violet-800 transition hover:border-violet-300 hover:bg-violet-50"
              >
                Kembali ke beranda
              </Link>
            </div>
          </div>

          <div
            className="flex w-full flex-col gap-6 rounded-[28px] border border-violet-100 bg-white/95 p-6 text-left shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:p-10"
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
                <div key={hak.judul} className="flex flex-col gap-1.5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                  <p className="text-sm font-semibold text-slate-900">{hak.judul}</p>
                  <p className="text-xs leading-relaxed text-slate-600">{hak.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-violet-100 pt-5">
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
                    <p className="text-xs leading-relaxed text-slate-600">{kanal.desc}</p>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-slate-500 italic">
                Bisa juga hubungi langsung bank atau penyedia QRIS yang kamu pakai untuk kasus yang lebih spesifik.
              </p>
            </div>
          </div>
        </div>

        <AmbientToggle on={soundOn} onToggle={toggleSound} />
      </>
    )
  }

  return (
    <>
      <div
        className="mx-auto flex w-full flex-col gap-8 rounded-[28px] border border-violet-100 bg-white/95 p-6 shadow-xl shadow-violet-200/50 backdrop-blur-sm sm:p-12"
        data-testid="skenario-panel"
        data-tour="keamanan-panel"
      >
        <ProgressDots total={TOTAL} current={state.index} accent="ungu" tone="light" />

        <div className="flex items-start gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7C5CFF] shadow-lg shadow-violet-500/30">
            <ScenarioIcon size={26} className="text-white" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-black tracking-widest text-[#7C5CFF] uppercase">
                Skenario {state.index + 1} dari {TOTAL}
              </p>
              <button
                type="button"
                onClick={() => speakScenario(skenario.cerita, { rate: 1.15 })}
                className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-800 transition hover:bg-violet-200"
                aria-label="Dengarkan lagi soal ini"
              >
                <Volume2 size={12} aria-hidden="true" />
                Dengarkan
              </button>
            </div>
            <p key={state.index} className="fade-scale-in text-[17px] leading-relaxed font-medium text-slate-900">
              {skenario.cerita}
            </p>
          </div>
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
          <div className="fade-scale-in flex flex-col gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-5">
            <div className="flex items-center gap-2.5">
              {opsi[state.selected].benar ? (
                <CircleCheck size={20} className="text-emerald-600" aria-hidden="true" />
              ) : (
                <CircleX size={20} className="text-red-500" aria-hidden="true" />
              )}
              <p className={`text-base font-bold ${opsi[state.selected].benar ? 'text-emerald-700' : 'text-red-600'}`}>
                {opsi[state.selected].benar ? 'Tepat sekali!' : 'Belum tepat'}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{opsi[state.selected].feedback}</p>
            <KoraNote tone="light" outcome={opsi[state.selected].benar ? 'correct' : 'incorrect'}>
              {opsi[state.selected].benar ? KORA_PESAN_BENAR : KORA_PESAN_SALAH}
            </KoraNote>
            <button
              type="button"
              className="inline-flex w-fit items-center justify-center gap-2 self-end rounded-full bg-[#7C5CFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-[#6847E8]"
              onClick={handleNext}
            >
              {state.index === TOTAL - 1 ? 'Lihat hasil' : 'Skenario Berikutnya'}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <AmbientToggle on={soundOn} onToggle={toggleSound} />
    </>
  )
}

export default KeamananFlow
