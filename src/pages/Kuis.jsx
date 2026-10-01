import AmbientToggle from '../components/AmbientToggle'
import ModuleHeader from '../components/ModuleHeader'
import { useAmbientSound } from '../hooks/useAmbientSound'
import KuisFlow from '../modules/kuis/KuisFlow'
import RupiahBackdrop from '../modules/kuis/RupiahBackdrop'

function Kuis() {
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)

  return (
    <main className="accent-mawar relative overflow-hidden bg-[#FFF1F2]">
      <RupiahBackdrop />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-4 pt-4 pb-28 sm:px-8 sm:gap-8 sm:pb-24 lg:px-10">
        <ModuleHeader
          accent="mawar"
          eyebrow="Cinta · Bangga · Paham Rupiah"
          title="Kuis CBP Rupiah"
          desc="10 soal seputar cara mengecek keaslian dan merawat uang rupiah."
        />

        <KuisFlow />
      </div>

      <AmbientToggle on={ambientOn} onToggle={() => setAmbientOn((prev) => !prev)} />
    </main>
  )
}

export default Kuis
