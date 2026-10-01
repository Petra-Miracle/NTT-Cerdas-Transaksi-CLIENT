import { useState } from 'react'
import AmbientToggle from '../components/AmbientToggle'
import ModuleHeader from '../components/ModuleHeader'
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
    <main className="accent-oranye relative overflow-hidden bg-[#FFF7ED]">
      <PasarBackdrop />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 px-4 pt-4 pb-28 sm:gap-8 sm:px-8 sm:pb-24 lg:px-20">
        <ModuleHeader
          accent="oranye"
          eyebrow="Pasar · Toko Sembako · UMKM"
          title="Kalkulator QRIS"
          desc="Jawab 4 pertanyaan singkat untuk melihat berapa banyak waktu dan potensi masalah uang tunai yang bisa kamu hindari dengan QRIS."
          onRestartTour={tour.restart}
        />

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
