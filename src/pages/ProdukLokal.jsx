import { ArrowLeft, Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AmbientToggle from '../components/AmbientToggle'
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
    <main className="relative overflow-hidden bg-white">
      <TenunBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 px-6 pt-4 pb-20 sm:px-10">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-blue-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali ke beranda
        </Link>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1A5DAD] px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase">
            Tenun · Kopi · Sasando · Garam NTT
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Cintai Produk Lokal</h1>
          <p className="max-w-[560px] text-base text-slate-600">
            Tebak 8 kartu produk — mana yang lokal/buatan Indonesia, mana yang produk impor.
          </p>
          <button
            type="button"
            onClick={tour.restart}
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1A5DAD]"
          >
            <Repeat2 size={13} aria-hidden="true" />
            Lihat panduan lagi
          </button>
        </div>

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
