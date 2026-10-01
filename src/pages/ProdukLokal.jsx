import AmbientToggle from '../components/AmbientToggle'
import ModuleHeader from '../components/ModuleHeader'
import ProductTour from '../components/ProductTour'
import { useAmbientSound } from '../hooks/useAmbientSound'
import { useProductTour } from '../hooks/useProductTour'
import ProdukLokalFlow from '../modules/produklokal/ProdukLokalFlow'
import TenunBackdrop from '../modules/produklokal/TenunBackdrop'

const TOUR_STEPS = [
  {
    target: 'produklokal-panel',
    title: 'Cara main "Lokal atau Bukan?"',
    desc: 'Baca nama & deskripsi produknya, lalu tebak apakah itu produk lokal/buatan Indonesia atau produk impor. Ada fakta menarik di tiap jawaban!',
  },
]

function ProdukLokal() {
  const tour = useProductTour('produklokal', TOUR_STEPS.length)
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)

  return (
    <main className="accent-biru relative overflow-hidden bg-white">
      <TenunBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-4 pt-4 pb-28 sm:px-8 sm:gap-8 sm:pb-24 lg:px-10">
        <ModuleHeader
          accent="biru"
          eyebrow="Tenun · Kopi · Sasando · Garam NTT"
          title="Cintai Produk Lokal"
          desc="Tebak 8 kartu produk — mana yang lokal/buatan Indonesia, mana yang produk impor."
          onRestartTour={tour.restart}
        />

        <ProdukLokalFlow />

        <ProductTour
          steps={TOUR_STEPS}
          stepIndex={tour.stepIndex}
          isActive={tour.isActive}
          onNext={tour.next}
          onPrev={tour.prev}
          onSkip={tour.skip}
        />
      </div>

      <AmbientToggle on={ambientOn} onToggle={() => setAmbientOn((prev) => !prev)} />
    </main>
  )
}

export default ProdukLokal
