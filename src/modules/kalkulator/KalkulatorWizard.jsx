import { useState } from 'react'
import OptionCard from '../../components/OptionCard'
import ProgressDots from '../../components/ProgressDots'
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

function KalkulatorWizard({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)

  const step = STEPS[stepIndex]
  const canProceed = isStepValid(step, answers)
  const isLastStep = stepIndex === STEPS.length - 1

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
    <div className="panel-glow panel-glow-indigo mx-auto flex w-full max-w-[720px] flex-col gap-6 p-6 sm:p-10" data-testid="kalkulator-wizard">
      <ProgressDots total={STEPS.length} current={stepIndex} />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleNext()
        }}
        className="flex flex-col gap-6"
      >
        {step === 'omzet' && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold text-white sm:text-xl">{QUESTIONS.omzet}</legend>
            <div className="flex flex-col gap-3">
              {OMZET_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  name="omzet"
                  value={option.value}
                  checked={answers.omzetHarian === option.value}
                  onChange={() => setAnswers((prev) => ({ ...prev, omzetHarian: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'pengalaman' && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold text-white sm:text-xl">{QUESTIONS.pengalaman}</legend>
            <div className="flex flex-col gap-3">
              {PENGALAMAN_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  type="checkbox"
                  name="pengalaman"
                  value={option.value}
                  checked={answers.pengalaman.includes(option.value)}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      pengalaman: togglePengalaman(prev.pengalaman, option.value, TIDAK_PERNAH_VALUE),
                    }))
                  }
                >
                  {option.label}
                </OptionCard>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'waktu' && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold text-white sm:text-xl">{QUESTIONS.waktu}</legend>
            <div className="flex flex-col gap-3">
              {WAKTU_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  name="waktu"
                  value={option.value}
                  checked={answers.waktuMenit === option.value}
                  onChange={() => setAnswers((prev) => ({ ...prev, waktuMenit: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'rekening' && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold text-white sm:text-xl">{QUESTIONS.rekening}</legend>
            <div className="flex flex-col gap-3">
              {REKENING_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  name="rekening"
                  value={option.value}
                  checked={answers.punyaRekening === option.value}
                  onChange={() => setAnswers((prev) => ({ ...prev, punyaRekening: option.value }))}
                >
                  {option.label}
                </OptionCard>
              ))}
            </div>
          </fieldset>
        )}

        <div className="flex items-center justify-between gap-3">
          <button type="button" className="btn-ghost" onClick={handlePrev} disabled={stepIndex === 0}>
            Sebelumnya
          </button>
          <button type="submit" className="btn-primary" disabled={!canProceed}>
            {isLastStep ? 'Lihat hasil' : 'Lanjut'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default KalkulatorWizard
