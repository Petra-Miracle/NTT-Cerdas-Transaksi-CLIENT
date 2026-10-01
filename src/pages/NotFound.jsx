import { Chip, EmptyState, buttonVariants } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'

function NotFound() {
  return (
    <main className="accent-navy flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <EmptyState className="flex max-w-[480px] flex-col items-center gap-4 text-center sm:gap-5">
        <img
          src={maskotKora}
          alt="Maskot KoRa kebingungan"
          className="mascot-float h-32 w-auto object-contain opacity-90 sm:h-40"
        />
        <Chip variant="primary" color="accent" size="sm" className="font-black tracking-widest uppercase">
          Error 404
        </Chip>
        <h1 className="text-2xl font-black tracking-tight text-balance text-slate-900 sm:text-3xl lg:text-4xl">
          KoRa juga bingung cari halaman ini
        </h1>
        <p className="max-w-[420px] text-[15px] leading-relaxed text-slate-600 sm:text-base">
          Halaman yang kamu cari tidak tersedia — mungkin alamatnya salah ketik atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className={buttonVariants({
            variant: 'primary',
            className: 'btn-cta shadow-lg shadow-[#15335F]/25 hover:-translate-y-0.5',
          })}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke beranda
        </Link>
      </EmptyState>
    </main>
  )
}

export default NotFound
