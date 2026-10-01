import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import AmbientToggle from '../components/AmbientToggle'
import { useAmbientSound } from '../hooks/useAmbientSound'
import KuisFlow from '../modules/kuis/KuisFlow'
import RupiahBackdrop from '../modules/kuis/RupiahBackdrop'

function Kuis() {
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)

  return (
    <main className="relative overflow-hidden bg-[#FFF1F2]">
      <RupiahBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 px-6 pt-4 pb-20 sm:px-10">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-rose-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-rose-800 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali ke beranda
        </Link>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#E11D48] px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase">
            Cinta · Bangga · Paham Rupiah
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Kuis CBP Rupiah</h1>
          <p className="max-w-[560px] text-base text-slate-600">
            10 soal seputar cara mengecek keaslian dan merawat uang rupiah.
          </p>
        </div>

        <KuisFlow />
      </div>

      <AmbientToggle on={ambientOn} onToggle={() => setAmbientOn((prev) => !prev)} />
    </main>
  )
}

export default Kuis
