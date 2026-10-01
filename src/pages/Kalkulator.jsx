import { ArrowLeft, Repeat2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AmbientToggle from '../components/AmbientToggle'
import ProductTour from '../components/ProductTour'
import { useAmbientSound } from '../hooks/useAmbientSound'
import { useProductTour } from '../hooks/useProductTour'
import KalkulatorResult from '../modules/kalkulator/KalkulatorResult'
import KalkulatorWizard from '../modules/kalkulator/KalkulatorWizard'
import PasarBackdrop from '../modules/kalkulator/PasarBackdrop'
import { calculateResult } from '../modules/kalkulator/kalkulatorLogic'
import { stopNarration } from '../utils/narration'
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
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)

  const toggleSound = () => {
    stopNarration()
    setAmbientOn((prev) => !prev)
  }

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
    <main className="relative overflow-hidden bg-[#FFF7ED]">
      <PasarBackdrop />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 pt-4 pb-20 sm:px-10 lg:px-20">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-orange-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali ke beranda
        </Link>

        <div className="flex flex-col gap-2">
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E8590C] px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase">
            Pasar · Toko Sembako · UMKM
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Kalkulator QRIS</h1>
          <p className="max-w-[600px] text-base text-slate-600">
            Jawab 4 pertanyaan singkat untuk melihat berapa banyak waktu dan potensi masalah uang tunai yang
            bisa kamu hindari dengan QRIS.
          </p>
          <button
            type="button"
            onClick={tour.restart}
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#E8590C]"
          >
            <Repeat2 size={13} aria-hidden="true" />
            Lihat panduan lagi
          </button>
        </div>

        {state ? (
          <KalkulatorResult answers={state.answers} result={state.result} onReset={() => setState(null)} />
        ) : (
          <KalkulatorWizard onComplete={handleComplete} soundOn={ambientOn} />
        )}

        <ProductTour
          steps={TOUR_STEPS}
          stepIndex={tour.stepIndex}
          isActive={tour.isActive}
          onNext={tour.next}
          onPrev={tour.prev}
          onSkip={tour.skip}
        />
      </div>

      <AmbientToggle on={ambientOn} onToggle={toggleSound} />
    </main>
  )
}

export default Kalkulator
