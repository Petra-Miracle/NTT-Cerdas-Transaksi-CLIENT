import { ExternalLink, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VIDEO_BELAJAR, videoThumb, videoWatch } from '../data/videoBelajar'

const ROTATE_MS = 6000

function Thumb({ yt, className = '' }) {
  return (
    <span className={`relative block overflow-hidden bg-slate-200 ${className}`}>
      <img
        src={videoThumb(yt)}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-transparent to-transparent"
        aria-hidden="true"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white ring-2 ring-white/80 transition group-hover:scale-110 group-hover:bg-[#E11D48]">
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>
      </span>
    </span>
  )
}

function VideoBelajar() {
  const [activeTab, setActiveTab] = useState(VIDEO_BELAJAR[0].id)
  const [featured, setFeatured] = useState(0)
  const [paused, setPaused] = useState(false)

  const row = VIDEO_BELAJAR.find((item) => item.id === activeTab) ?? VIDEO_BELAJAR[0]
  const spotlight = row.videos[featured] ?? row.videos[0]
  const rest = row.videos.filter((_, i) => i !== featured)

  // Sorotan berputar otomatis tiap 6 detik; berhenti saat disentuh/fokus
  // atau saat pengguna memilih gerakan minimal.
  useEffect(() => {
    if (paused) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => {
      setFeatured((prev) => (prev + 1) % row.videos.length)
    }, ROTATE_MS)
    return () => clearInterval(timer)
  }, [paused, activeTab, row.videos.length])

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-12 sm:px-6" aria-label="Belajar lewat video">
      <div className="flex flex-col gap-1">
        <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900">Belajar lewat video</h2>
        <p className="text-[13px] text-slate-500">
          40 video pilihan dari YouTube — klik kartu untuk menonton langsung di YouTube.
        </p>
      </div>

      <div role="tablist" aria-label="Kategori video" className="mt-4 flex flex-wrap gap-2">
        {VIDEO_BELAJAR.map((item) => {
          const selected = item.id === activeTab
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-video-${item.id}`}
              id={`tab-video-${item.id}`}
              onClick={() => {
                setActiveTab(item.id)
                setFeatured(0)
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 ${
                selected ? `${item.bg} ring-2 ring-slate-900 ring-offset-2` : `${item.bg} opacity-55 hover:opacity-90`
              }`}
            >
              {item.label}
              <span className="rounded-full bg-black/25 px-1.5 py-0.5 text-[10px] font-black">
                {item.videos.length}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-video-${row.id}`}
        aria-labelledby={`tab-video-${row.id}`}
        className={`mt-5 rounded-3xl p-4 sm:p-6 ${row.id === 'hemat' ? 'bg-orange-50 ring-1 ring-orange-200' : row.id === 'waspada' ? 'bg-violet-50 ring-1 ring-violet-200' : row.id === 'cbp' ? 'bg-rose-50 ring-1 ring-rose-200' : 'bg-blue-50 ring-1 ring-blue-200'}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Sorotan utama */}
        <a
          key={spotlight.yt}
          href={videoWatch(spotlight.yt)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Tonton di YouTube: ${spotlight.title}`}
          className="group grid grid-cols-1 gap-5 overflow-hidden rounded-2xl bg-slate-900 p-4 text-white shadow-lg sm:p-5 lg:grid-cols-[1.4fr_1fr]"
        >
          <span className="relative">
            <Thumb yt={spotlight.yt} className="aspect-video w-full rounded-xl" />
            <span className="absolute top-2.5 left-2.5 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-black tracking-wide text-white">
              #{featured + 1} • SEDANG DISOROT
            </span>
          </span>
          <span className="flex flex-col justify-center gap-2.5">
            <span className={`w-fit rounded-full ${row.bg} px-3 py-1 text-[11px] font-black tracking-wide uppercase`}>
              {row.label}
            </span>
            <span className="text-xl leading-snug font-extrabold sm:text-2xl">{spotlight.title}</span>
            <span className="text-[13px] font-medium text-white/70">{spotlight.channel}</span>
            <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow transition group-hover:bg-red-500">
              <Play size={16} fill="currentColor" aria-hidden="true" />
              Tonton di YouTube
              <ExternalLink size={14} aria-hidden="true" />
            </span>
          </span>
        </a>

        {/* Sisa video */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {rest.map((video) => {
            const rank = row.videos.indexOf(video) + 1
            return (
              <a
                key={video.yt}
                href={videoWatch(video.yt)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Tonton di YouTube: ${video.title}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="relative block">
                  <Thumb yt={video.yt} className="aspect-video w-full" />
                  <span className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-black text-white">
                    #{rank}
                  </span>
                </span>
                <span className="block px-3 pt-2 pb-1">
                  <span className="line-clamp-2 min-h-[2.6em] text-[12.5px] leading-snug font-bold text-slate-900">
                    {video.title}
                  </span>
                </span>
                <span className="block truncate px-3 pb-3 text-[11px] font-medium text-slate-500">
                  {video.channel}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default VideoBelajar
