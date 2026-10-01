import { ArrowLeft, Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'
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
    <main className="relative overflow-hidden bg-[#F5F3FF]">
      <KeamananBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 px-6 pt-4 pb-20 sm:px-10">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-violet-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali ke beranda
        </Link>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#7C5CFF] px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase">
            Perlindungan Konsumen Digital
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Keamanan QRIS</h1>
          <p className="max-w-[560px] text-base text-slate-600">
            Tiga skenario nyata yang sering dialami pedagang — pilih tindakan yang menurutmu paling tepat.
          </p>
          <button
            type="button"
            onClick={tour.restart}
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#7C5CFF]"
          >
            <Repeat2 size={13} aria-hidden="true" />
            Lihat panduan lagi
          </button>
        </div>

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
