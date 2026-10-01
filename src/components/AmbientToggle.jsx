import { Volume2, VolumeX } from 'lucide-react'

// Tombol musik latar — kecil di pojok kanan bawah, tidak mengganggu.
function AmbientToggle({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Matikan musik latar' : 'Nyalakan musik latar'}
      title={on ? 'Matikan musik latar' : 'Nyalakan musik latar'}
      className="fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#15335F] text-white shadow-xl ring-1 ring-white/25 transition hover:scale-105"
    >
      {on ? <Volume2 size={19} aria-hidden="true" /> : <VolumeX size={19} aria-hidden="true" />}
    </button>
  )
}

export default AmbientToggle
