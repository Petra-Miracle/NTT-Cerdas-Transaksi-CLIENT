import { ArrowRight, BadgeCheck, BookOpenCheck, Calculator, Landmark, Repeat2, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'
import ModuleCard from '../components/ModuleCard'
import ProductTour from '../components/ProductTour'
import Reveal from '../components/Reveal'
import { useProductTour } from '../hooks/useProductTour'
import KuisModal from '../modules/kuis/KuisModal'

const BERANDA_TOUR_STEPS = [
  {
    target: 'menu-brand',
    title: 'Selamat datang di NTT Cerdas Transaksi',
    desc: 'Ini beranda utama. Klik logo ini kapan saja untuk kembali ke sini dari halaman mana pun.',
  },
  {
    target: 'menu-cta',
    title: 'Mulai cepat dari sini',
    desc: 'Tombol ini langsung membawamu ke Kalkulator QRIS — modul yang paling cocok untuk memulai.',
  },
  {
    target: 'module-kalkulator',
    title: '1. Kalkulator QRIS',
    desc: 'Hitung berapa banyak waktu dan risiko tunai yang bisa kamu hemat kalau beralih ke QRIS.',
  },
  {
    target: 'module-keamanan',
    title: '2. Keamanan QRIS',
    desc: 'Uji kepekaanmu lewat skenario nyata penipuan QRIS, lengkap dengan info kanal pengaduan resmi.',
  },
  {
    target: 'module-kuis',
    title: '3. Kuis CBP Rupiah',
    desc: 'Uji pemahamanmu soal cara mengecek keaslian dan merawat uang rupiah.',
  },
  {
    target: 'module-produklokal',
    title: '4. Lokal atau Bukan?',
    desc: 'Tebak mana produk lokal/buatan Indonesia dan mana yang produk impor lewat kartu-kartu seru ini.',
  },
]

function Beranda() {
  const [isKuisOpen, setIsKuisOpen] = useState(false)
  const tour = useProductTour('beranda', BERANDA_TOUR_STEPS.length)

  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100svh-88px)] max-w-[1280px] flex-col items-center justify-center gap-16 px-6 py-8 sm:px-10 lg:flex-row lg:px-20 lg:py-16">
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
            NTT Cerdas Transaksi membantumu menghitung penghematan QRIS, mengenali risiko penipuan, menguji
            pemahaman Cinta Bangga Paham Rupiah, dan mengenali produk lokal lewat empat modul interaktif
            untuk pedagang UMKM Kupang.
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
            className="mascot-float relative h-[360px] w-auto object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <Reveal
        as="section"
        id="modul"
        className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 pb-16 sm:px-10 lg:px-20"
      >
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-ochre)] uppercase">
            Empat Modul Interaktif
          </p>
          <h2 className="text-[28px] font-bold text-white sm:text-[34px]">
            Belajar Transaksi Digital Lewat Praktik Langsung
          </h2>
          <button
            type="button"
            onClick={tour.restart}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-on-bg-muted)] hover:text-white"
          >
            <Repeat2 size={13} aria-hidden="true" />
            Lihat panduan lagi
          </button>
        </div>

        <div className="panel-glow panel-glow-indigo p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ModuleCard
              index="01"
              Icon={Calculator}
              eyebrow="Mulai di sini"
              title="Kalkulator QRIS"
              desc="Hitung berapa banyak waktu dan risiko tunai yang bisa kamu hemat dengan beralih ke QRIS."
              ctaLabel="Hitung sekarang"
              accent="indigo"
              to="/kalkulator"
              tourId="module-kalkulator"
            />

            <ModuleCard
              index="02"
              Icon={ShieldCheck}
              eyebrow="Kenali risikonya"
              title="Keamanan QRIS"
              desc="Uji kepekaanmu lewat 3 skenario nyata penipuan QRIS dan pelajari cara mengenalinya."
              ctaLabel="Coba skenario"
              accent="rust"
              to="/keamanan"
              tourId="module-keamanan"
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
              tourId="module-kuis"
            />

            <ModuleCard
              index="04"
              Icon={ShoppingBag}
              eyebrow="Cintai produk lokal"
              title="Lokal atau Bukan?"
              desc="Tebak 8 kartu produk — mana yang lokal/buatan Indonesia, mana yang produk impor."
              ctaLabel="Mulai tebak"
              accent="ochre"
              to="/produk-lokal"
              tourId="module-produklokal"
            />
          </div>
        </div>
      </Reveal>

      <KuisModal isOpen={isKuisOpen} onClose={() => setIsKuisOpen(false)} />

      <ProductTour
        steps={BERANDA_TOUR_STEPS}
        stepIndex={tour.stepIndex}
        isActive={tour.isActive}
        onNext={tour.next}
        onPrev={tour.prev}
        onSkip={tour.skip}
      />
    </main>
  )
}

export default Beranda
