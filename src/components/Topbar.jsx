import { Link } from 'react-router-dom'

function Topbar({ variant = 'dark', onOpenKuis }) {
  const isLight = variant === 'light'

  if (isLight) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-white/15 bg-[#15335F]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-tour="menu-brand"
            aria-label="NTT Cerdas Transaksi - Beranda"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg font-black text-[#15335F]">
              N
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold tracking-tight text-white">
                NTT Cerdas Transaksi
              </span>
              <span className="block text-[11px] font-semibold text-white/70">
                Bank Indonesia Kupang • Edukasi QRIS & Rupiah
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Navigasi modul">
            <Link
              to="/kalkulator"
              className="rounded-full bg-emerald-500 px-4 py-2 text-[13px] font-bold text-white shadow-sm ring-1 ring-white/25 transition hover:brightness-110"
            >
              Kalkulator
            </Link>
            <Link
              to="/keamanan"
              className="rounded-full bg-amber-500 px-4 py-2 text-[13px] font-bold text-white shadow-sm ring-1 ring-white/25 transition hover:brightness-110"
            >
              Keamanan
            </Link>
            <button
              type="button"
              onClick={onOpenKuis}
              className="rounded-full bg-sky-500 px-4 py-2 text-[13px] font-bold text-white shadow-sm ring-1 ring-white/25 transition hover:brightness-110"
            >
              Kuis CBP
            </button>
            <Link
              to="/produk-lokal"
              className="rounded-full bg-[#7C3AED] px-4 py-2 text-[13px] font-bold text-white shadow-sm ring-1 ring-white/25 transition hover:brightness-110"
            >
              Produk Lokal
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/kalkulator"
              className="rounded-lg bg-[#FFD02F] px-4 py-2.5 text-sm font-black text-[#15335F] shadow-md transition hover:brightness-105"
              data-tour="menu-cta"
            >
              Main Sekarang
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="flex w-full items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-20">
      <Link to="/" className="text-lg font-bold text-white transition hover:opacity-80" data-tour="menu-brand">
        NTT Cerdas Transaksi
      </Link>
      <div className="flex items-center gap-3.5">
        <Link to="/kalkulator" className="btn-primary !px-5 !py-2.5 !text-sm" data-tour="menu-cta">
          Mulai Sekarang
        </Link>
      </div>
    </header>
  )
}

export default Topbar
