import { Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'
import { playKoraSound } from '../utils/koraSound'

const FLY_MS = 1400
const BLAST_MS = 700

// Overlay peluncuran modul ala Kahoot: KoRa terbang masuk menembus kabut,
// lalu tombol Play besar yang responsif. Klik Play memicu ledakan kabut
// sebagai transisi sebelum benar-benar masuk ke modul.
function ModuleLaunch({ module, onPlay, onClose }) {
  const [stage, setStage] = useState('fly') // fly -> ready -> blast
  const playRef = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    timers.current.push(setTimeout(() => setStage('ready'), FLY_MS))
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  useEffect(() => {
    if (stage === 'ready') {
      playKoraSound('correct')
      playRef.current?.focus()
    }
  }, [stage])

  const handlePlay = () => {
    if (stage !== 'ready') return
    playKoraSound('correct')
    setStage('blast')
    timers.current.push(setTimeout(onPlay, BLAST_MS))
  }

  const Icon = module.Icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Siap main ${module.title}`}
      className="fixed inset-0 z-[9990] flex items-center justify-center overflow-hidden bg-[#0b1e3a]/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Kabut latar */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="mist-cloud mist-a" />
        <span className="mist-cloud mist-b" />
        <span className="mist-cloud mist-c" />
      </div>

      <div
        className="launch-card relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/20 shadow-2xl"
        style={{ background: module.bg }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Batalkan dan kembali"
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <X size={17} aria-hidden="true" />
        </button>

        {/* Zona terbang KoRa */}
        <div className="relative flex h-[210px] items-center justify-center overflow-hidden">
          <span className="launch-runway" aria-hidden="true" />
          {stage === 'fly' ? (
            <img
              src={maskotKora}
              alt="KoRa terbang menuju permainan"
              className="kora-fly relative z-10 h-[150px] w-auto object-contain drop-shadow-2xl"
            />
          ) : (
            <img
              src={maskotKora}
              alt="KoRa siap bermain"
              className="mascot-float relative z-10 h-[150px] w-auto object-contain drop-shadow-2xl"
            />
          )}
          {stage !== 'blast' && (
            <span className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
              <span className={`h-2 w-2 rounded-full ${stage === 'fly' ? 'bg-white' : 'bg-white/40'}`} />
              <span className={`h-2 w-2 rounded-full ${stage === 'ready' ? 'bg-white' : 'bg-white/40'}`} />
              <span className={`h-2 w-2 rounded-full ${stage === 'blast' ? 'bg-white' : 'bg-white/40'}`} />
            </span>
          )}
        </div>

        {/* Konten */}
        <div className="relative bg-white px-6 pt-5 pb-6 text-center sm:px-8">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black tracking-wide text-[#15335F] uppercase">
            {Icon && <Icon size={13} aria-hidden="true" />}
            {module.badge}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{module.title}</h3>
          <p className="mx-auto mt-1 max-w-[380px] text-[13.5px] leading-relaxed text-slate-500">{module.desc}</p>

          {stage === 'fly' ? (
            <p className="mt-5 text-[13px] font-bold text-slate-400" role="status">
              KoRa sedang menyiapkan permainan…
            </p>
          ) : (
            <div className="fade-scale-in mt-5 flex flex-col items-center gap-2.5">
              <button
                ref={playRef}
                type="button"
                onClick={handlePlay}
                aria-label={`Mulai main ${module.title}`}
                className="play-btn group relative flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#15335F] text-white shadow-xl shadow-[#15335F]/30 transition hover:scale-105 active:scale-95"
              >
                <span className="play-ping" aria-hidden="true" />
                <Play size={38} fill="currentColor" aria-hidden="true" className="ml-1" />
              </button>
              <p className="text-[15px] font-black tracking-wide text-[#15335F] uppercase">
                Tekan Play untuk mulai!
              </p>
            </div>
          )}
        </div>

        {/* Ledakan kabut transisi */}
        {stage === 'blast' && <div className="mist-blast" aria-hidden="true" />}
      </div>
    </div>
  )
}

export default ModuleLaunch
