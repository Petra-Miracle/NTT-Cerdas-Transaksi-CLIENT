import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <header className="flex w-full items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-20">
      <Link to="/" className="text-lg font-bold text-white transition hover:opacity-80">
        NTT Cerdas Transaksi
      </Link>
      <div className="flex items-center gap-3.5">
        <span className="pill-badge hidden sm:inline-flex">Karya Inovasi Bank Indonesia Kupang 2026</span>
        <Link to="/kalkulator" className="btn-primary !px-5 !py-2.5 !text-sm">
          Mulai Sekarang
        </Link>
      </div>
    </header>
  )
}

export default Topbar
