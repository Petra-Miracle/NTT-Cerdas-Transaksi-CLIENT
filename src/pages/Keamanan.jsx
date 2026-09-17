import { Link } from 'react-router-dom'
import KeamananFlow from '../modules/keamanan/KeamananFlow'

function Keamanan() {
  return (
    <main className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-6 pb-16">
      <Link to="/" className="back-link w-fit">
        ← Kembali ke beranda
      </Link>

      <div className="mx-auto max-w-[760px] text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Keamanan QRIS</h1>
        <p className="page-intro mt-2 text-[var(--color-ink-on-bg-muted)]">
          Tiga skenario nyata yang sering dialami pedagang — pilih tindakan yang menurutmu paling tepat.
        </p>
      </div>

      <KeamananFlow />
    </main>
  )
}

export default Keamanan
