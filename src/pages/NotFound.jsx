import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Halaman tidak ditemukan</h1>
      <p className="text-[var(--color-ink-on-bg-muted)]">Halaman yang kamu cari tidak tersedia.</p>
      <Link to="/" className="btn-primary">
        Kembali ke beranda
      </Link>
    </main>
  )
}

export default NotFound
