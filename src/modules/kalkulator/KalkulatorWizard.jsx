import { ArrowLeft, ArrowRight, Clock3, History, Landmark, Store, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import OptionCard from '../../components/OptionCard'
import ProgressDots from '../../components/ProgressDots'
import { speakScenario, stopNarration } from '../../utils/narration'
import {
  OMZET_OPTIONS,
  PENGALAMAN_OPTIONS,
  QUESTIONS,
  REKENING_OPTIONS,
  TIDAK_PERNAH_VALUE,
  WAKTU_OPTIONS,
} from './kalkulatorContent'
import { togglePengalaman } from './kalkulatorLogic'

const INITIAL_ANSWERS = {
  omzetHarian: null,
  pengalaman: [],
  waktuMenit: null,
  punyaRekening: null,
}

const STEPS = ['omzet', 'pengalaman', 'waktu', 'rekening']

const STEP_META = {
  omzet: { Icon: Store, label: 'Langkah 1 dari 4 · Omzet harian' },
  pengalaman: { Icon: History, label: 'Langkah 2 dari 4 · Pengalaman tunai' },
  waktu: { Icon: Clock3, label: 'Langkah 3 dari 4 · Waktu terbuang' },
  rekening: { Icon: Landmark, label: 'Langkah 4 dari 4 · Rekening bank' },
}

function isStepValid(step, answers) {
  switch (step) {
    case 'omzet':
      return answers.omzetHarian !== null
    case 'pengalaman':
      return answers.pengalaman.length > 0
    case 'waktu':
      return answers.waktuMenit !== null
    case 'rekening':
      return answers.punyaRekening !== null
    default:
      return false
  }
}

function KalkulatorWizard({ onComplete, soundOn = true }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)

  const step = STEPS[stepIndex]
  const canProceed = isStepValid(step, answers)
  const isLastStep = stepIndex === STEPS.length - 1
  const { Icon, label } = STEP_META[step]
  const question = QUESTIONS[step]

  // Bacakan pertanyaan otomatis dengan suara perempuan tiap langkah dibuka.
  useEffect(() => {
    if (!soundOn) return undefined
    const timer = setTimeout(() => speakScenario(question), 400)
    return () => {
      clearTimeout(timer)
      stopNarration()
    }
  }, [step, soundOn, question])

  useEffect(() => stopNarration, [])

  const answerAndStop = (updater) => {
    stopNarration()
    setAnswers(updater)
  }

  const handleNext = () => {
    if (!canProceed) return
    if (isLastStep) {
      onComplete(answers)
      return
    }
    setStepIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(0, prev - 1))
  }

  return (
    <div
      className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-9 rounded-[28px] border border-orange-100 bg-white/95 p-6 shadow-xl shadow-orange-200/50 backdrop-blur-sm sm:p-12"
      data-testid="kalkulator-wizard"
      data-tour="kalkulator-panel"
    >
      <ProgressDots total={STEPS.length} current={stepIndex} accent="oranye" tone="light" />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleNext()
        }}
        className="flex flex-col items-center gap-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8590C] text-white shadow-lg shadow-orange-500/30">
            <Icon size={24} aria-hidden="true" />
          </span>
          <p className="text-[11px] font-black tracking-widest text-[#E8590C] uppercase">{label}</p>
          <button
            type="button"
            onClick={() => speakScenario(question)}
            className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-800 transition hover:bg-orange-200"
            aria-label="Dengarkan lagi pertanyaan ini"
          >
            <Volume2 size={12} aria-hidden="true" />
            Dengarkan
          </button>
        </div>
        <fieldset key={step} className="fade-scale-in flex w-full max-w-[640px] flex-col items-center gap-6">
          <legend className="mb-1 text-center text-2xl font-extrabold text-slate-900">
            {step === 'omzet' && QUESTIONS.omzet}
            {step === 'pengalaman' && QUESTIONS.pengalaman}
            {step === 'waktu' && QUESTIONS.waktu}
            {step === 'rekening' && QUESTIONS.rekening}
          </legend>
          <div className="flex w-full flex-col gap-3">
            {step === 'omzet' &&
              OMZET_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  tone="light"
                  name="omzet"
                  value={option.value}
                  checked={answers.omzetHarian === option.value}
                  onChange={() => answerAndStop((prev) => ({ ...prev, omzetHarian: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}

            {step === 'pengalaman' &&
              PENGALAMAN_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  tone="light"
                  type="checkbox"
                  name="pengalaman"
                  value={option.value}
                  checked={answers.pengalaman.includes(option.value)}
                  onChange={() =>
                    answerAndStop((prev) => ({
                      ...prev,
                      pengalaman: togglePengalaman(prev.pengalaman, option.value, TIDAK_PERNAH_VALUE),
                    }))
                  }
                >
                  {option.label}
                </OptionCard>
              ))}

            {step === 'waktu' &&
              WAKTU_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  tone="light"
                  name="waktu"
                  value={option.value}
                  checked={answers.waktuMenit === option.value}
                  onChange={() => answerAndStop((prev) => ({ ...prev, waktuMenit: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}

            {step === 'rekening' &&
              REKENING_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  tone="light"
                  name="rekening"
                  value={option.value}
                  checked={answers.punyaRekening === option.value}
                  onChange={() => answerAndStop((prev) => ({ ...prev, punyaRekening: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}
          </div>
        </fieldset>

        <div className="flex w-full max-w-[640px] items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-200 bg-white px-6 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handlePrev}
            disabled={stepIndex === 0}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Sebelumnya
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8590C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#C94F08] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canProceed}
          >
            {isLastStep ? 'Lihat hasil' : 'Lanjut'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default KalkulatorWizard
