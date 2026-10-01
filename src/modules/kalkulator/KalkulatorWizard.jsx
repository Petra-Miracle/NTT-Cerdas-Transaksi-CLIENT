import { ArrowLeft, ArrowRight, Clock3, History, Landmark, Store, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, CheckboxGroup, Chip, RadioGroup } from '@heroui/react'
import { CheckboxOption, RadioOption } from '../../components/OptionCard'
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
      className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-6 rounded-[24px] border border-orange-100 bg-white/95 p-5 shadow-xl shadow-orange-200/50 backdrop-blur-sm sm:gap-9 sm:rounded-[28px] sm:p-8 lg:p-12"
      data-testid="kalkulator-wizard"
      data-tour="kalkulator-panel"
    >
      <ProgressDots total={STEPS.length} current={stepIndex} accent="oranye" tone="light" />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleNext()
        }}
        className="flex flex-col items-center gap-6 sm:gap-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-orange-500/30">
            <Icon size={24} aria-hidden="true" />
          </span>
          <Chip variant="soft" color="accent" size="sm" className="font-black tracking-widest uppercase">
            {label}
          </Chip>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => speakScenario(question)}
            className="h-11 bg-[var(--accent-soft)] px-4 font-bold text-[var(--accent-soft-foreground)] hover:bg-[var(--accent-soft-hover)]"
            aria-label="Dengarkan lagi pertanyaan ini"
          >
            <Volume2 size={14} aria-hidden="true" />
            Dengarkan
          </Button>
        </div>
        <fieldset key={step} className="fade-scale-in flex w-full max-w-[640px] flex-col items-center gap-4 sm:gap-6">
          <legend className="mb-1 text-center text-xl leading-snug font-extrabold text-balance text-slate-900 sm:text-2xl">
            {question}
          </legend>

          {step === 'omzet' && (
            <RadioGroup
              aria-label={question}
              name="omzet"
              value={answers.omzetHarian === null ? null : String(answers.omzetHarian)}
              onChange={(value) => answerAndStop((prev) => ({ ...prev, omzetHarian: Number(value) }))}
              className="flex w-full flex-col gap-3"
            >
              {OMZET_OPTIONS.map((option) => (
                <RadioOption key={option.value} value={String(option.value)}>
                  {option.label}
                </RadioOption>
              ))}
            </RadioGroup>
          )}

          {step === 'pengalaman' && (
            <CheckboxGroup
              aria-label={question}
              name="pengalaman"
              value={answers.pengalaman}
              onChange={(next) =>
                answerAndStop((prev) => {
                  // Bandingkan dengan pilihan sebelumnya untuk tahu opsi mana yang
                  // baru di-toggle, lalu pakai aturan eksklusif yang sama.
                  const toggled =
                    next.find((value) => !prev.pengalaman.includes(value)) ??
                    prev.pengalaman.find((value) => !next.includes(value))
                  if (!toggled) return prev
                  return {
                    ...prev,
                    pengalaman: togglePengalaman(prev.pengalaman, toggled, TIDAK_PERNAH_VALUE),
                  }
                })
              }
              className="flex w-full flex-col gap-3"
            >
              {PENGALAMAN_OPTIONS.map((option) => (
                <CheckboxOption key={option.value} value={option.value}>
                  {option.label}
                </CheckboxOption>
              ))}
            </CheckboxGroup>
          )}

          {step === 'waktu' && (
            <RadioGroup
              aria-label={question}
              name="waktu"
              value={answers.waktuMenit === null ? null : String(answers.waktuMenit)}
              onChange={(value) => answerAndStop((prev) => ({ ...prev, waktuMenit: Number(value) }))}
              className="flex w-full flex-col gap-3"
            >
              {WAKTU_OPTIONS.map((option) => (
                <RadioOption key={option.value} value={String(option.value)}>
                  {option.label}
                </RadioOption>
              ))}
            </RadioGroup>
          )}

          {step === 'rekening' && (
            <RadioGroup
              aria-label={question}
              name="rekening"
              value={answers.punyaRekening}
              onChange={(value) => answerAndStop((prev) => ({ ...prev, punyaRekening: value }))}
              className="flex w-full flex-col gap-3"
            >
              {REKENING_OPTIONS.map((option) => (
                <RadioOption key={option.value} value={option.value}>
                  {option.label}
                </RadioOption>
              ))}
            </RadioGroup>
          )}
        </fieldset>

        <div className="flex w-full max-w-[640px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            className="btn-cta btn-accent-outline order-2 sm:order-1 sm:w-auto"
            fullWidth
            onPress={handlePrev}
            isDisabled={stepIndex === 0}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Sebelumnya
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="btn-cta order-1 shadow-lg shadow-orange-500/30 sm:order-2 sm:w-auto sm:min-w-[160px]"
            isDisabled={!canProceed}
          >
            {isLastStep ? 'Lihat hasil' : 'Lanjut'}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default KalkulatorWizard
