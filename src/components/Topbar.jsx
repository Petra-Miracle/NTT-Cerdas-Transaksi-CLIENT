import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <header className="flex w-full items-center justify-center px-6 py-5">
      <div className="flex w-full max-w-[960px] items-center justify-between gap-3">
        <Link
          to="/"
          className="font-[var(--font-display)] text-lg font-bold text-white transition hover:opacity-80"
        >
          NTT Cerdas Transaksi
        </Link>
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-[var(--color-ink-on-bg-muted)]">
          Karya Inovasi Bank Indonesia Kupang 2026
        </span>
      </div>
    </header>
  )
}

export default Topbar
