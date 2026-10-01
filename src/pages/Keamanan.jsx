import ModuleHeader from '../components/ModuleHeader'
import ProductTour from '../components/ProductTour'
import { useProductTour } from '../hooks/useProductTour'
import KeamananBackdrop from '../modules/keamanan/KeamananBackdrop'
import KeamananFlow from '../modules/keamanan/KeamananFlow'

const TOUR_STEPS = [
  {
    target: 'keamanan-panel',
    title: 'Cara pakai Keamanan QRIS',
    desc: 'Baca tiap skenario, pilih tindakan yang menurutmu paling tepat, lalu lihat feedbacknya. Setelah 3 skenario selesai, ada juga info kanal pengaduan resmi.',
  },
]

function Keamanan() {
  const tour = useProductTour('keamanan', TOUR_STEPS.length)

  return (
    <main className="accent-ungu relative overflow-hidden bg-[#F5F3FF]">
      <KeamananBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-4 pt-4 pb-28 sm:px-8 sm:gap-8 sm:pb-24 lg:px-10">
        <ModuleHeader
          accent="ungu"
          eyebrow="Perlindungan Konsumen Digital"
          title="Keamanan QRIS"
          desc="Tiga skenario nyata yang sering dialami pedagang — pilih tindakan yang menurutmu paling tepat."
          onRestartTour={tour.restart}
        />

        <KeamananFlow />

        <ProductTour
          steps={TOUR_STEPS}
          stepIndex={tour.stepIndex}
          isActive={tour.isActive}
          onNext={tour.next}
          onPrev={tour.prev}
          onSkip={tour.skip}
        />
      </div>
    </main>
  )
}

export default Keamanan
