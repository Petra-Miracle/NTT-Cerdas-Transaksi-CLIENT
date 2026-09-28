import { ArrowLeft, Repeat2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductTour from '../components/ProductTour'
import { useProductTour } from '../hooks/useProductTour'
import KalkulatorResult from '../modules/kalkulator/KalkulatorResult'
import KalkulatorWizard from '../modules/kalkulator/KalkulatorWizard'
import { calculateResult } from '../modules/kalkulator/kalkulatorLogic'
import { submitKalkulatorResult } from '../services/api'

const TOUR_STEPS = [
  {
    target: 'kalkulator-panel',
    title: 'Cara pakai Kalkulator QRIS',
    desc: 'Jawab 4 pertanyaan singkat dengan memilih kartu jawaban, lalu klik "Lanjut" di kanan bawah untuk lihat hasil penghematannya.',
  },
]

function Kalkulator() {
  const [state, setState] = useState(null) // { answers, result }
  const tour = useProductTour('kalkulator', TOUR_STEPS.length)

  const handleComplete = (answers) => {
    const result = calculateResult(answers)
    setState({ answers, result })

    submitKalkulatorResult({
      omzetHarian: answers.omzetHarian,
      pengalaman: answers.pengalaman,
      waktuMenit: answers.waktuMenit,
      punyaRekening: answers.punyaRekening === 'ya',
      uangTunaiPerBulan: result.uangTunaiPerBulan,
      jamPerBulan: result.jamPerBulan,
      nilaiWaktuBulanan: result.nilaiWaktuBulanan,
    })
  }

  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 pb-20 sm:px-10 lg:px-20">
      <Link to="/" className="btn-ghost w-fit !px-4 !py-2 !text-[13px]">
        <ArrowLeft size={14} aria-hidden="true" />
        Kembali ke beranda
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white">Kalkulator QRIS</h1>
        <p className="max-w-[600px] text-base text-[var(--color-ink-on-bg-muted)]">
          Jawab 4 pertanyaan singkat untuk melihat berapa banyak waktu dan potensi masalah uang tunai yang
          bisa kamu hindari dengan QRIS.
        </p>
        <button
          type="button"
          onClick={tour.restart}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[var(--color-ink-on-bg-muted)] hover:text-white"
        >
          <Repeat2 size={13} aria-hidden="true" />
          Lihat panduan lagi
        </button>
      </div>

      {state ? (
        <KalkulatorResult answers={state.answers} result={state.result} onReset={() => setState(null)} />
      ) : (
        <KalkulatorWizard onComplete={handleComplete} />
      )}

      <ProductTour
        steps={TOUR_STEPS}
        stepIndex={tour.stepIndex}
        isActive={tour.isActive}
        onNext={tour.next}
        onPrev={tour.prev}
        onSkip={tour.skip}
      />
    </main>
  )
}

export default Kalkulator
