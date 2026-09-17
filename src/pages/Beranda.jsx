import { ArrowRight, BadgeCheck, BookOpenCheck, Calculator, Landmark, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import maskotKora from '../assets/img/BonekaKoRa.jpg'
import ModuleCard from '../components/ModuleCard'
import { useOnboarding } from '../hooks/useOnboarding'
import KuisModal from '../modules/kuis/KuisModal'

function Beranda() {
  const [isKuisOpen, setIsKuisOpen] = useState(false)
  const { showOnboarding, markSeen } = useOnboarding()

  return (
    <main>
      <section className="mx-auto flex max-w-[1280px] flex-col items-center gap-16 px-6 py-8 sm:px-10 lg:flex-row lg:px-20 lg:py-16">
        <div className="flex max-w-[560px] flex-col items-center gap-7 text-center lg:items-start lg:text-left">
          <span className="pill-badge">
            <Landmark size={14} className="text-[var(--color-ochre)]" aria-hidden="true" />
            Program Edukasi Transaksi Digital NTT
          </span>

          <h1 className="text-4xl leading-[1.05] font-bold text-white sm:text-5xl">
            Kuasai Transaksi Digital
            <br />
            <span className="text-[var(--color-ochre)]">Aman &amp; Menguntungkan</span>
          </h1>

          <p className="text-lg leading-relaxed text-[var(--color-ink-on-bg-muted)]">
            NTT Cerdas Transaksi membantumu menghitung penghematan QRIS, mengenali risiko penipuan, dan
            menguji pemahaman Cinta Bangga Paham Rupiah — lewat tiga modul interaktif untuk pedagang UMKM
            Kupang.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/kalkulator" className="btn-primary">
              Mulai Kalkulator QRIS
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="#modul" className="btn-ghost">
              Lihat Semua Modul
            </a>
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-[var(--color-sage)]" aria-hidden="true" />
            <span className="text-sm font-medium text-[var(--color-ink-on-bg-muted)]">
              Gratis, tanpa perlu daftar akun
            </span>
          </div>
        </div>

        <div className="relative flex h-[380px] w-[320px] shrink-0 items-center justify-center">
          <div
            className="absolute h-[440px] w-[440px] rounded-full opacity-70 blur-[40px]"
            style={{ background: 'radial-gradient(circle, var(--color-ochre) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <img
            src={maskotKora}
            alt="Maskot KoRa, Duta Rupiah Flobamora, melambaikan tangan"
            className="relative h-[340px] w-[280px] rounded-[32px] object-cover shadow-2xl"
          />
        </div>
      </section>

      <section id="modul" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-ochre)] uppercase">
            Tiga Modul Interaktif
          </p>
          <h2 className="text-[28px] font-bold text-white sm:text-[34px]">
            Belajar Transaksi Digital Lewat Praktik Langsung
          </h2>
        </div>

        <div className="panel-glow panel-glow-indigo p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="relative">
              {showOnboarding && (
                <div
                  className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--color-ochre)] px-4 py-2 text-xs font-semibold whitespace-nowrap text-[var(--color-ochre-text)] shadow-lg"
                  role="status"
                >
                  Mulai di sini ↑
                </div>
              )}
              <ModuleCard
                index="01"
                Icon={Calculator}
                eyebrow="Mulai di sini"
                title="Kalkulator QRIS"
                desc="Hitung berapa banyak waktu dan risiko tunai yang bisa kamu hemat dengan beralih ke QRIS."
                ctaLabel="Hitung sekarang"
                accent="indigo"
                to="/kalkulator"
                onClick={markSeen}
                highlighted={showOnboarding}
              />
            </div>

            <ModuleCard
              index="02"
              Icon={ShieldCheck}
              eyebrow="Kenali risikonya"
              title="Keamanan QRIS"
              desc="Uji kepekaanmu lewat 3 skenario nyata penipuan QRIS dan pelajari cara mengenalinya."
              ctaLabel="Coba skenario"
              accent="rust"
              to="/keamanan"
            />

            <ModuleCard
              index="03"
              Icon={BookOpenCheck}
              eyebrow="Uji pemahamanmu"
              title="Kuis CBP Rupiah"
              desc="10 soal seputar cara mengecek keaslian & merawat uang rupiah, ala Cinta Bangga Paham."
              ctaLabel="Mulai kuis"
              accent="sage"
              onClick={() => setIsKuisOpen(true)}
            />
          </div>
        </div>
      </section>

      <KuisModal isOpen={isKuisOpen} onClose={() => setIsKuisOpen(false)} />
    </main>
  )
}

export default Beranda
