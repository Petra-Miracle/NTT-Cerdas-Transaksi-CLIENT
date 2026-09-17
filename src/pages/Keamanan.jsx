import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import KeamananFlow from '../modules/keamanan/KeamananFlow'

function Keamanan() {
  return (
    <main className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 px-6 pb-20 sm:px-10">
      <Link to="/" className="btn-ghost w-fit self-start !px-4 !py-2 !text-[13px]">
        <ArrowLeft size={14} aria-hidden="true" />
        Kembali ke beranda
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold text-white">Keamanan QRIS</h1>
        <p className="max-w-[560px] text-base text-[var(--color-ink-on-bg-muted)]">
          Tiga skenario nyata yang sering dialami pedagang — pilih tindakan yang menurutmu paling tepat.
        </p>
      </div>

      <KeamananFlow />
    </main>
  )
}

export default Keamanan
