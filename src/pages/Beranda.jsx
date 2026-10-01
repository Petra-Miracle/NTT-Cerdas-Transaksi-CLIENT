import { Chip, Label, Link as HeroLink, SearchField } from '@heroui/react'
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Play,
  QrCode,
  ShieldCheck,
  ShoppingBag,
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
import { VIDEO_BELAJAR, videoWatch } from '../data/videoBelajar'
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

function normalizeSearchText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function Beranda({ onOpenKuis: onOpenKuisProp }) {
  const [pendingLaunch, setPendingLaunch] = useState(null) // kalkulator | keamanan | kuis | produklokal
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [ambientOn, setAmbientOn] = useAmbientSound(0.4)
  const tour = useProductTour('beranda', BERANDA_TOUR_STEPS.length)
  const navigate = useNavigate()
  // Jalur normal: App mengoper navigate('/kuis'). Fallback render mandiri.
  const openKuis = onOpenKuisProp ?? (() => navigate('/kuis'))
  const searchTokens = normalizeSearchText(searchQuery).trim().split(/\s+/).filter(Boolean)
  const searchMatches = searchTokens.length
    ? [
        ...QUICK_TOOLS.map((module) => ({
          id: module.tourId,
          type: 'module',
          title: module.title,
          detail: module.desc,
          category: 'Modul belajar',
          launchId: module.tourId.replace('module-', ''),
          Icon: module.Icon,
          searchText: `${module.title} ${module.desc} ${module.badge} ${module.cta}`,
        })),
        ...VIDEO_BELAJAR.flatMap((category) =>
          category.videos.map((video) => ({
            id: video.yt,
            type: 'video',
            title: video.title,
            detail: video.channel,
            category: category.label,
            href: videoWatch(video.yt),
            searchText: `${video.title} ${video.channel} ${category.label}`,
          })),
        ),
      ].filter((item) => {
        const searchableText = normalizeSearchText(item.searchText)
        return searchTokens.every((token) => searchableText.includes(token))
      })
    : []

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
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[15px] font-bold text-slate-900">
            Mau belajar apa hari ini?
          </p>
          <div className="relative z-30 w-full max-w-md">
            <div className="flex items-center gap-2">
              <SearchField
                aria-label="Cari modul belajar"
                className="min-w-0 flex-1"
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value)
                  setSearchOpen(Boolean(value.trim()))
                }}
                onSubmit={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setSearchOpen(false)
                }}
              >
                <Label className="sr-only">Cari modul belajar</Label>
                <SearchField.Group className="h-11 rounded-xl border border-slate-300 bg-white shadow-sm">
                  <SearchField.SearchIcon className="text-slate-400" />
                  <SearchField.Input
                    placeholder="Cari: QRIS, 3D, tenun, kopi..."
                    className="min-w-0 text-[15px]"
                    onFocus={() => searchQuery.trim() && setSearchOpen(true)}
                  />
                  <SearchField.ClearButton className="size-11 !bg-transparent !shadow-none hover:!bg-transparent" />
                </SearchField.Group>
              </SearchField>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="h-11 shrink-0 rounded-xl bg-emerald-600 px-4 font-bold text-white shadow hover:bg-emerald-700"
              >
                Cari Modul
              </button>
            </div>

            {searchOpen && searchQuery.trim() && (
              <div
                role="region"
                aria-label={`Hasil pencarian untuk ${searchQuery}`}
                aria-live="polite"
                className="absolute top-full right-0 left-0 mt-2 max-h-[420px] overflow-y-auto rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-200"
              >
                <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500">
                  <span>Hasil pencarian</span>
                  <span>{searchMatches.length} hasil</span>
                </div>
                {searchMatches.length ? (
                  searchMatches.slice(0, 8).map((result) => {
                    const ResultIcon = result.Icon ?? Play
                    const resultContent = (
                      <>
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#15335F]">
                          <ResultIcon size={17} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block text-[10px] font-bold uppercase text-slate-500">
                            {result.type === 'module' ? result.category : `Video • ${result.category}`}
                          </span>
                          <span className="block truncate text-sm font-bold text-slate-900">{result.title}</span>
                          <span className="block truncate text-xs text-slate-500">{result.detail}</span>
                        </span>
                        <ArrowRight size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
                      </>
                    )

                    if (result.type === 'module') {
                      return (
                        <button
                          key={result.id}
                          type="button"
                          onClick={() => {
                            setSearchOpen(false)
                            setPendingLaunch(result.launchId)
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-slate-50"
                        >
                          {resultContent}
                        </button>
                      )
                    }

                    return (
                      <a
                        key={result.id}
                        href={result.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-slate-50"
                      >
                        {resultContent}
                      </a>
                    )
                  })
                ) : (
                  <p className="px-3 py-5 text-center text-sm text-slate-500">
                    Tidak ada konten yang cocok dengan “{searchQuery}”.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[calc(100svh-8.5rem)] overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'radial-gradient(#dbe4f3 1.5px, transparent 1.5px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-10 lg:py-14">
          <div className="text-center lg:text-left">
            <h1 className="mt-4 text-3xl leading-[1.08] font-black tracking-tight text-[#15335F] sm:text-4xl lg:text-[56px] xl:text-[64px]">
              Belajar QRIS
              <br />
              untuk UMKM Kupang
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-slate-600 sm:text-[16px] lg:mx-0">
              Hitung penghematan QRIS, waspada penipuan, kuis Cinta Bangga Paham Rupiah, dan tebak produk
              lokal NTT. Empat mode interaktif untuk pedagang UMKM Kupang.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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
          <div className="relative mx-auto flex w-full max-w-[400px] items-center justify-center sm:max-w-[520px] xl:max-w-[620px]">
            <img
              src={maskotKora}
              alt="Maskot KoRa, Duta Rupiah Flobamora"
              className="mascot-float relative z-10 h-[260px] w-auto object-contain drop-shadow-2xl sm:h-[340px] lg:h-[380px] xl:h-[460px]"
            />
            <div className="absolute top-4 left-0 z-20 rotate-[-6deg] rounded-xl bg-white px-3 py-2 shadow-xl ring-1 ring-slate-200 sm:top-6 sm:left-2 sm:px-3.5 sm:py-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-black text-[#15335F] sm:text-[12px]">
                <QrCode size={14} aria-hidden="true" /> QRIS = Hemat Waktu!
              </p>
              <p className="text-[10px] font-medium text-slate-500 sm:text-[11px]">Rp15.000 / jam terhemat</p>
            </div>
            <div className="absolute right-0 bottom-6 z-20 rotate-[5deg] rounded-xl bg-[#E8590C] px-3 py-2 shadow-xl sm:bottom-8 sm:right-2 sm:px-3.5 sm:py-2.5">
              <p className="text-[11px] font-black text-white sm:text-[12px]">Cek 3D: Dilihat!</p>
              <p className="text-[10px] font-medium text-white/85 sm:text-[11px]">Diraba • Diterawang</p>
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
                  <Chip size="sm" className="bg-black/25 font-bold text-white">
                    ⚡ {m.badge}
                  </Chip>
                </div>
                <p className="mt-4 text-[17px] leading-snug font-extrabold text-white">{m.title}</p>
                <p className="mt-1 max-w-[34ch] text-sm leading-relaxed text-white/90">{m.desc}</p>
                <span className="mt-5 inline-flex min-h-[40px] w-fit items-center gap-1.5 rounded-xl bg-white px-4 text-sm font-bold text-slate-900 shadow transition group-hover:gap-2.5">
                  {m.cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            )

            const cls = `group relative flex flex-col overflow-hidden rounded-2xl ${m.bg} p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.99]`

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
          className="mt-3 inline-flex min-h-[44px] items-center text-[12px] font-semibold text-slate-500 underline-offset-2 hover:text-[#15335F] hover:underline"
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
          className="relative overflow-hidden rounded-[24px] bg-[#0B1E3A] px-5 py-10 text-center shadow-2xl sm:rounded-[32px] sm:px-12 sm:py-16"
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
          <p className="relative text-[10px] font-black tracking-[0.3em] text-[#FFD02F] uppercase sm:text-[11px]">
            Beta kasih tau ee
          </p>
          <p className="relative mx-auto mt-4 max-w-[900px] font-display text-3xl leading-[1.05] font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
            Lu{' '}
            <span className="inline-block -rotate-2 rounded-lg bg-[#FFD02F] px-2 py-0.5 text-[#0B1E3A] shadow-lg sm:rounded-xl sm:px-4 sm:py-1">
              sonde keren
            </span>
            <br />
            kalau belum pakai{' '}
            <span className="text-[#FFD02F]">QRIS!</span>
          </p>
          <p className="relative mx-auto mt-5 max-w-[520px] text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
            Hitung hematmu, kenali jebakannya, menangkan kuisnya — mulai dari Kalkulator QRIS.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/kalkulator"
              onClick={(e) => openLaunch(e, 'kalkulator')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8590C] px-7 py-3 text-sm font-black text-white shadow-xl shadow-orange-900/40 transition hover:-translate-y-0.5 hover:bg-[#C94F08] sm:px-8 sm:py-3.5 sm:text-[15px]"
            >
              Buktikan Sekarang
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href="#modul"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-[15px]"
            >
              Pilih Modul Dulu
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-[13px] font-medium text-slate-500">
          Info QRIS resmi:{' '}
          <HeroLink
            href="https://www.bi.go.id/QRIS"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#15335F] underline-offset-2"
          >
            bi.go.id/QRIS
          </HeroLink>{' '}
          • Pengaduan: BI 131 / OJK 157
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
