import { useEffect } from 'react'
import { PartyPopper, ShieldQuestion } from 'lucide-react'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'
import { playKoraSound } from '../utils/koraSound'

const OUTCOME_CONFIG = {
  correct: {
    label: 'Jawaban tepat!',
    icon: PartyPopper,
    wrapper: 'kora-review-correct',
    badge: 'kora-review-correct-label',
    mascotAnim: 'kora-bounce-correct',
  },
  incorrect: {
    label: 'Yuk, pelajari lagi!',
    icon: ShieldQuestion,
    wrapper: 'kora-review-incorrect',
    badge: 'kora-review-incorrect-label',
    mascotAnim: 'kora-shake-incorrect',
  },
  neutral: {
    label: null,
    icon: null,
    wrapper: 'border-white/10 bg-white/5',
    badge: '',
    mascotAnim: 'mascot-float',
  },
}

// Membuat KoRa jadi "teman belajar transaksi cerdas" yang muncul kontekstual
// di tiap modul — bukan cuma dekorasi statis di beranda. `outcome` memberi
// KoRa reaksi visual yang berbeda untuk jawaban benar/salah, dan tetap netral
// untuk catatan biasa (mis. pesan penutup di layar hasil). `tone="light"`
// untuk latar terang (teks gelap), default gelap untuk panel dark.
function KoraNote({ children, outcome = 'neutral', tone = 'dark', className = '' }) {
  const config = OUTCOME_CONFIG[outcome] ?? OUTCOME_CONFIG.neutral
  const Icon = config.icon
  const isLight = tone === 'light'

  useEffect(() => {
    if (outcome !== 'neutral') {
      playKoraSound(outcome)
    }
  }, [outcome])

  const neutralWrapper = isLight ? 'border-orange-200 bg-orange-50' : 'border-white/10 bg-white/5'

  return (
    <div
      role="status"
      data-outcome={outcome}
      className={`fade-scale-in flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${outcome === 'neutral' ? neutralWrapper : config.wrapper}${isLight ? ' kora-tone-light' : ''} ${className}`}
    >
      <img
        key={outcome}
        src={maskotKora}
        alt="Maskot KoRa"
        className={`h-12 w-12 shrink-0 object-contain ${config.mascotAnim}`}
      />
      <div className="flex flex-col gap-0.5">
        {config.label && (
          <p className={`flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase ${config.badge}`}>
            {Icon && <Icon size={14} aria-hidden="true" />}
            {config.label}
          </p>
        )}
        <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-[var(--color-ink-on-bg)]'}`}>
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>KoRa: </span>
          {children}
        </p>
      </div>
    </div>
  )
}

export default KoraNote
