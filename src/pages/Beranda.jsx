import { BookOpenCheck, Calculator, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import ModuleCard from '../components/ModuleCard'
import { useOnboarding } from '../hooks/useOnboarding'
import KuisModal from '../modules/kuis/KuisModal'

function Beranda() {
  const [isKuisOpen, setIsKuisOpen] = useState(false)
  const { showOnboarding, markSeen } = useOnboarding()

  return (
    <main className="mx-auto flex w-full max-w-[960px] flex-col gap-10 px-6 pb-16">
      <section className="mx-auto max-w-[760px] text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Dashboard edukasi transaksi digital untuk pedagang UMKM Kupang
        </h1>
        <p className="mt-4 text-[var(--color-ink-on-bg-muted)]">
          Pelajari untung-rugi QRIS, kenali potensi penipuan, dan uji pemahamanmu soal Cinta Bangga Paham
          Rupiah — semua dalam tiga modul singkat.
        </p>
      </section>

      <section className="panel-glow panel-glow-indigo p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="relative">
            {showOnboarding && (
              <div
                className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-ochre)] px-4 py-2 text-xs font-semibold text-white shadow-lg"
                role="status"
              >
                Mulai di sini ↑
              </div>
            )}
            <ModuleCard
              index="01"
              Icon={Calculator}
              eyebrow="Modul utama"
              title="Kalkulator QRIS"
              desc="Hitung berapa waktu & risiko uang tunai yang bisa kamu hindari dengan QRIS."
              ctaLabel="Mulai hitung"
              glow="indigo"
              to="/kalkulator"
              onClick={markSeen}
              highlighted={showOnboarding}
            />
          </div>

          <ModuleCard
            index="02"
            Icon={ShieldCheck}
            eyebrow="Simulasi"
            title="Keamanan QRIS"
            desc="Uji kejelianmu lewat 3 skenario penipuan yang sering dialami pedagang."
            ctaLabel="Mulai simulasi"
            glow="rust"
            to="/keamanan"
          />

          <ModuleCard
            index="03"
            Icon={BookOpenCheck}
            eyebrow="Kuis"
            title="Kuis CBP Rupiah"
            desc="10 soal seputar cara mengecek keaslian & merawat uang rupiah."
            ctaLabel="Mulai kuis"
            glow="sage"
            onClick={() => setIsKuisOpen(true)}
          />
        </div>
      </section>

      <KuisModal isOpen={isKuisOpen} onClose={() => setIsKuisOpen(false)} />
    </main>
  )
}

export default Beranda
