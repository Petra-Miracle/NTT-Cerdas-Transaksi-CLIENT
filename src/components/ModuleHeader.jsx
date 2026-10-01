import { Breadcrumbs, Button, Chip } from '@heroui/react'
import { ArrowLeft, Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'

// Warna per modul — dipakai tombol kembali, pil eyebrow, dan hover tautan
// panduan. Kelas ditulis utuh (bukan dirakit) supaya terdeteksi Tailwind.
const ACCENTS = {
  oranye: {
    back: 'border-orange-200 text-orange-800 hover:border-orange-300 hover:bg-orange-50',
    pill: 'bg-[#E8590C]',
    tour: 'hover:text-[#E8590C]',
  },
  ungu: {
    back: 'border-violet-200 text-violet-800 hover:border-violet-300 hover:bg-violet-50',
    pill: 'bg-[#7C5CFF]',
    tour: 'hover:text-[#7C5CFF]',
  },
  mawar: {
    back: 'border-rose-200 text-rose-800 hover:border-rose-300 hover:bg-rose-50',
    pill: 'bg-[#E11D48]',
    tour: 'hover:text-[#E11D48]',
  },
  biru: {
    back: 'border-blue-200 text-blue-800 hover:border-blue-300 hover:bg-blue-50',
    pill: 'bg-[#1A5DAD]',
    tour: 'hover:text-[#1A5DAD]',
  },
}

// Kepala halaman modul yang seragam: tombol kembali, eyebrow berwarna,
// judul, deskripsi, dan (opsional) tautan "Lihat panduan lagi". Ada lapisan
// putih lembut di belakang teks supaya tetap terbaca di atas backdrop ramai.
function ModuleHeader({ accent, eyebrow, title, desc, onRestartTour }) {
  const a = ACCENTS[accent] ?? ACCENTS.biru

  return (
    <>
      <div className="flex w-full items-center justify-between gap-3">
        <Link
          to="/"
          className={`inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border bg-white/90 px-4 py-2 text-[13px] font-semibold shadow-sm backdrop-blur-sm transition active:scale-[0.98] ${a.back}`}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali ke beranda
        </Link>
        {/* Jejak lokasi untuk layar lebar; di HP tombol kembali sudah cukup. */}
        <Breadcrumbs className="hidden rounded-full bg-white/80 px-4 py-2 text-[13px] backdrop-blur-sm md:flex">
          <Breadcrumbs.Item href="/">Beranda</Breadcrumbs.Item>
          <Breadcrumbs.Item>{title}</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div className="relative flex w-full flex-col items-center gap-2 text-center">
        <div
          className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-0 rounded-[40px] bg-white/70 blur-2xl"
          aria-hidden="true"
        />
        <Chip
          variant="primary"
          color="accent"
          size="sm"
          className={`relative px-3 text-[11px] font-black tracking-widest text-white uppercase shadow-sm ${a.pill}`}
        >
          {eyebrow}
        </Chip>
        <h1 className="relative text-[28px] leading-tight font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
          {title}
        </h1>
        <p className="relative max-w-[560px] text-[15px] leading-relaxed text-slate-700 sm:text-base">{desc}</p>
        {onRestartTour && (
          <Button
            variant="ghost"
            size="sm"
            onPress={onRestartTour}
            className={`relative h-11 px-3 text-[13px] font-semibold text-slate-500 ${a.tour}`}
          >
            <Repeat2 size={14} aria-hidden="true" />
            Lihat panduan lagi
          </Button>
        )}
      </div>
    </>
  )
}

export default ModuleHeader
