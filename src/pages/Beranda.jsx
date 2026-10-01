import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Play,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'
import AmbientToggle from '../components/AmbientToggle'
import ModuleLaunch from '../components/ModuleLaunch'
import ModulMotif from '../components/ModulMotif'
import ProductTour from '../components/ProductTour'
import Reveal from '../components/Reveal'
import VideoBelajar from '../components/VideoBelajar'
import { useAmbientSound } from '../hooks/useAmbientSound'
import { useProductTour } from '../hooks/useProductTour'

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

const QUICK_TOOLS = [  {
    tourId: 'module-kalkulator',
    bg: 'bg-[#E8590C]',
    soft: 'bg-white/20',
    badge: '4 pertanyaan',
    title: 'Hitung hemat QRIS dari nol',
    desc: 'Jawab cepat, lihat estimasi waktu & uang tunai yang bisa dihemat.',
    cta: 'Hitung Sekarang',
    to: '/kalkulator',
    Icon: Calculator,
  },
  {
    tourId: 'module-keamanan',
    bg: 'bg-[#7C5CFF]',
    soft: 'bg-white/20',
    badge: '3 skenario nyata',
    title: 'Kenali jebakan QR palsu',
    desc: 'Latih kepekaan lewat cerita penipuan yang sering kena pedagang.',
    cta: 'Coba Skenario',
    to: '/keamanan',
    Icon: ShieldCheck,
  },
  {
    tourId: 'module-kuis',
    bg: 'bg-[#E5484D]',
    soft: 'bg-white/20',
    badge: '10 soal • CBP',
    title: 'Kuis Rupiah CBP',
    desc: '3D, 5 Jangan, dan tukar uang rusak.',
    cta: 'Mulai Kuis',
    to: null,
    Icon: BookOpenCheck,
  },
  {
    tourId: 'module-produklokal',
    bg: 'bg-[#1A5DAD]',
    soft: 'bg-white/20',
    badge: '8 kartu tebak',
    title: 'Lokal atau Impor?',
    desc: 'Tebak Tenun, Kopi Bajawa, Sasando sampai Garam NTT.',
    cta: 'Mulai Tebak',
    to: '/produk-lokal',
    Icon: ShoppingBag,
  },
]

const LAUNCH_MODULES = {
  kalkulator: {
    title: 'Kalkulator QRIS',
    desc: 'Jawab 4 pertanyaan singkat, lihat estimasi waktu dan uang tunai yang bisa dihemat.',
    badge: '4 pertanyaan',
    bg: 'linear-gradient(135deg, #E8590C, #B23E04)',
    to: '/kalkulator',
    Icon: Calculator,
  },
  keamanan: {
    title: 'Keamanan QRIS',
    desc: 'Tiga skenario jebakan nyata yang sering dialami pedagang. Berani coba?',
    badge: '3 skenario nyata',
    bg: 'linear-gradient(135deg, #7C5CFF, #4C1D95)',
    to: '/keamanan',
    Icon: ShieldCheck,
  },
  kuis: {
    title: 'Kuis CBP Rupiah',
    desc: 'Sepuluh soal 3D, 5 Jangan, dan tukar uang rusak.',
    badge: '10 soal • CBP',
    bg: 'linear-gradient(135deg, #E5484D, #A92A2E)',
    to: null,
    Icon: BookOpenCheck,
  },
  produklokal: {
    title: 'Lokal atau Impor?',
    desc: 'Delapan kartu produk — Tenun, Kopi Bajawa, Sasando sampai Garam NTT.',
    badge: '8 kartu tebak',
    bg: 'linear-gradient(135deg, #1A5DAD, #0E2547)',
    to: '/produk-lokal',
    Icon: ShoppingBag,
  },
}

function Beranda({ onOpenKuis: onOpenKuisProp }) {
  const [pendingLaunch, setPendingLaunch] = useState(null) // kalkulator | keamanan | kuis | produklokal
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)
  const tour = useProductTour('beranda', BERANDA_TOUR_STEPS.length)
  const navigate = useNavigate()
  // Jalur normal: App mengoper navigate('/kuis'). Fallback render mandiri.
  const openKuis = onOpenKuisProp ?? (() => navigate('/kuis'))

  const openLaunch = (e, id) => {
    e?.preventDefault()
    setPendingLaunch(id)
  }

  const handleLaunchPlay = () => {
    const mod = LAUNCH_MODULES[pendingLaunch]
    setPendingLaunch(null)
    if (!mod) return
    if (mod.to) {
      navigate(mod.to)
    } else {
      openKuis()
    }
  }

  return (
    <main className="bg-white text-slate-900">
      {/* Search strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[15px] font-bold text-slate-900">
            Mau belajar apa hari ini?
          </p>
          <div className="flex w-full max-w-md items-center gap-2">
            <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm">
              <Search size={16} className="text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Cari: QRIS, 3D, tenun, kopi..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('modul')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              />
            </label>
            <a
              href="#modul"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow hover:bg-emerald-700"
            >
              Cari Modul
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'radial-gradient(#dbe4f3 1.5px, transparent 1.5px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#15335F] px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-white uppercase">
              <Sparkles size={13} aria-hidden="true" />
              Program Edukasi Transaksi Digital NTT • BI Kupang
            </div>
            <h1 className="mt-4 text-4xl leading-[1.05] font-black tracking-tight text-[#15335F] sm:text-5xl lg:text-[56px]">
              Belajar QRIS
              <br />
              untuk UMKM Kupang
            </h1>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-slate-600">
              Hitung penghematan QRIS, waspada penipuan, kuis Cinta Bangga Paham Rupiah, dan tebak produk
              lokal NTT. Empat mode interaktif untuk pedagang UMKM Kupang.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/kalkulator"
                onClick={(e) => openLaunch(e, 'kalkulator')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#15335F] px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[#15335F]/25 transition hover:-translate-y-0.5 hover:bg-[#0e2547]"
              >
                <Play size={17} aria-hidden="true" />
                Main Kalkulator QRIS
              </Link>
              <a
                href="#modul"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#15335F]/15 bg-white px-6 py-3.5 text-[15px] font-bold text-[#15335F] transition hover:border-[#15335F]/40"
              >
                Lihat Semua Modul
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Visual kanan */}
          <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <div className="absolute h-[380px] w-[380px] rounded-full bg-[#FFD02F]/60 blur-0" aria-hidden="true" />
            <div
              className="absolute h-[420px] w-[420px] rounded-[48px] rotate-6 bg-[#15335F]"
              aria-hidden="true"
            />
            <img
              src={maskotKora}
              alt="Maskot KoRa, Duta Rupiah Flobamora"
              className="mascot-float relative z-10 h-[340px] w-auto object-contain drop-shadow-2xl sm:h-[380px]"
            />
            <div className="absolute top-6 -left-1 z-20 rotate-[-6deg] rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 sm:left-2">
              <p className="flex items-center gap-1.5 text-[12px] font-black text-[#15335F]">
                <QrCode size={15} aria-hidden="true" /> QRIS = Hemat Waktu!
              </p>
              <p className="text-[11px] font-medium text-slate-500">Rp15.000 / jam terhemat</p>
            </div>
            <div className="absolute right-0 bottom-8 z-20 rotate-[5deg] rounded-xl bg-[#E8590C] px-3.5 py-2.5 shadow-xl sm:right-2">
              <p className="text-[12px] font-black text-white">Cek 3D: Dilihat!</p>
              <p className="text-[11px] font-medium text-white/85">Diraba • Diterawang</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick tools */}
      <Reveal
        as="section"
        id="modul"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-4 pt-4 pb-10 sm:px-6"
      >
        <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900">
          Pilih modul belajar
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {QUICK_TOOLS.map((m) => {
            const launchId =
              m.tourId === 'module-kalkulator'
                ? 'kalkulator'
                : m.tourId === 'module-keamanan'
                  ? 'keamanan'
                  : m.tourId === 'module-kuis'
                    ? 'kuis'
                    : 'produklokal'
            const inner = (
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.soft} ring-1 ring-white/40`}>
                    <m.Icon size={24} className="text-white" aria-hidden="true" />
                  </span>
                  <span className="rounded-md bg-black/25 px-2 py-1 text-[11px] font-bold text-white">
                    ⚡ {m.badge}
                  </span>
                </div>
                <p className="mt-4 text-[17px] leading-snug font-extrabold text-white">{m.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/85">{m.desc}</p>
                <span className="mt-5 inline-flex w-fit rounded-lg bg-white px-4 py-2 text-[13px] font-bold text-slate-900 shadow">
                  {m.cta}
                </span>
              </div>
            )

            const cls = `relative flex flex-col overflow-hidden rounded-2xl ${m.bg} p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl`

            if (m.to) {
              return (
                <Link
                  key={m.tourId}
                  to={m.to}
                  onClick={(e) => openLaunch(e, launchId)}
                  data-tour={m.tourId}
                  className={cls}
                >
                  <ModulMotif kind={launchId} />
                  {inner}
                </Link>
              )
            }
            return (
              <button
                key={m.tourId}
                type="button"
                data-tour={m.tourId}
                onClick={() => setPendingLaunch(launchId)}
                className={`${cls} text-left`}
              >
                <ModulMotif kind={launchId} />
                {inner}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={tour.restart}
          className="mt-3 text-[12px] font-semibold text-slate-500 underline-offset-2 hover:text-[#15335F] hover:underline"
        >
          Lihat panduan lagi
        </button>
      </Reveal>

      {/* Explore curated */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6">
        <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900">Jelajahi konten pilihan</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/kalkulator"
            onClick={(e) => openLaunch(e, 'kalkulator')}
            className="group relative overflow-hidden rounded-2xl bg-[#15335F] p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-2xl leading-tight font-black text-white">
              Hemat <br /> ala QRIS
            </p>
            <p className="mt-1 text-[13px] font-medium text-white/75">by Bank Indonesia Kupang</p>
            <Calculator size={88} className="absolute -right-3 -bottom-3 text-white/15 transition group-hover:scale-110" aria-hidden="true" />
            <span className="mt-4 inline-flex rounded-md bg-[#FFD02F] px-2.5 py-1 text-[11px] font-black text-[#15335F]">
              4 PERTANYAAN
            </span>
          </Link>

          <Link
            to="/keamanan"
            onClick={(e) => openLaunch(e, 'keamanan')}
            className="group relative overflow-hidden rounded-2xl bg-[#4C1D95] p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-2xl leading-tight font-black text-white">
              Waspada <br /> QR Palsu
            </p>
            <p className="mt-1 text-[13px] font-medium text-white/75">3 jebakan pedagang</p>
            <ShieldCheck size={88} className="absolute -right-3 -bottom-3 text-white/15 transition group-hover:scale-110" aria-hidden="true" />
            <span className="mt-4 inline-flex rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#4C1D95]">
              3 SKENARIO
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setPendingLaunch('kuis')}
            className="group relative overflow-hidden rounded-2xl bg-[#FFB020] p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-2xl leading-tight font-black text-[#15335F]">
              Kuis CBP <br /> Rupiah
            </p>
            <p className="mt-1 text-[13px] font-semibold text-[#15335F]/70">Dilihat • Diraba • Diterawang</p>
            <BookOpenCheck size={88} className="absolute -right-3 -bottom-3 text-[#15335F]/15 transition group-hover:scale-110" aria-hidden="true" />
            <span className="mt-4 inline-flex rounded-md bg-[#15335F] px-2.5 py-1 text-[11px] font-black text-white">
              10 SOAL
            </span>
          </button>

          <Link
            to="/produk-lokal"
            onClick={(e) => openLaunch(e, 'produklokal')}
            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-2xl leading-tight font-black text-[#E11D48]">
              Bangga <br />
              <span className="text-slate-900">Produk Lokal</span>
            </p>
            <p className="mt-1 text-[13px] font-medium text-slate-500">Tenun • Kopi • Sasando • Garam</p>
            <ShoppingBag size={88} className="absolute -right-3 -bottom-3 text-slate-200 transition group-hover:scale-110" aria-hidden="true" />
            <span className="mt-4 inline-flex rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-black text-white">
              8 KARTU
            </span>
          </Link>
        </div>
      </section>

      {/* Video edukasi YouTube */}
      <VideoBelajar />

      {/* Slogan penutup khas Kupang */}
      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[32px] bg-[#0B1E3A] px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='%23FFD02F' stroke-opacity='0.22' stroke-width='1.5'%3E%3Cpath d='M48 0 96 48 48 96 0 48Z'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: '96px 96px',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, #E8590C, transparent)' }}
            aria-hidden="true"
          />
          <p className="relative text-[11px] font-black tracking-[0.3em] text-[#FFD02F] uppercase">
            Beta kasih tau ee
          </p>
          <p className="relative mx-auto mt-4 max-w-[900px] font-display text-5xl leading-[1.02] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Lu{' '}
            <span className="inline-block -rotate-2 rounded-xl bg-[#FFD02F] px-3 py-1 text-[#0B1E3A] shadow-lg sm:px-4">
              sonde keren
            </span>
            <br />
            kalau belum pakai{' '}
            <span className="text-[#FFD02F]">QRIS!</span>
          </p>
          <p className="relative mx-auto mt-5 max-w-[520px] text-[15px] leading-relaxed text-white/70">
            Hitung hematmu, kenali jebakannya, menangkan kuisnya — mulai dari Kalkulator QRIS.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/kalkulator"
              onClick={(e) => openLaunch(e, 'kalkulator')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8590C] px-8 py-3.5 text-[15px] font-black text-white shadow-xl shadow-orange-900/40 transition hover:-translate-y-0.5 hover:bg-[#C94F08]"
            >
              Buktikan Sekarang
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href="#modul"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-8 py-3.5 text-[15px] font-bold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Pilih Modul Dulu
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-[12px] font-medium text-slate-400">
          Info QRIS resmi: bi.go.id/QRIS • Pengaduan: BI 131 / OJK 157
        </p>
      </section>

      <AmbientToggle on={ambientOn} onToggle={() => setAmbientOn((prev) => !prev)} />

      {pendingLaunch && LAUNCH_MODULES[pendingLaunch] && (
        <ModuleLaunch
          module={{ id: pendingLaunch, ...LAUNCH_MODULES[pendingLaunch] }}
          onPlay={handleLaunchPlay}
          onClose={() => setPendingLaunch(null)}
        />
      )}

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
