import { ArrowLeft, Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductTour from '../components/ProductTour'
import { useProductTour } from '../hooks/useProductTour'
import ProdukLokalFlow from '../modules/produklokal/ProdukLokalFlow'

const TOUR_STEPS = [
  {
    target: 'produklokal-panel',
    title: 'Cara main "Lokal atau Bukan?"',
    desc: 'Baca nama & deskripsi produknya, lalu tebak apakah itu produk lokal/buatan Indonesia atau produk impor. Ada fakta menarik di tiap jawaban!',
  },
]

function ProdukLokal() {
  const tour = useProductTour('produklokal', TOUR_STEPS.length)

  return (
    <main className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 px-6 pb-20 sm:px-10">
      <Link to="/" className="btn-ghost w-fit self-start !px-4 !py-2 !text-[13px]">
        <ArrowLeft size={14} aria-hidden="true" />
        Kembali ke beranda
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold text-white">Cintai Produk Lokal</h1>
        <p className="max-w-[560px] text-base text-[var(--color-ink-on-bg-muted)]">
          Tebak 8 kartu produk — mana yang lokal/buatan Indonesia, mana yang produk impor.
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

      <ProdukLokalFlow />

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

export default ProdukLokal
