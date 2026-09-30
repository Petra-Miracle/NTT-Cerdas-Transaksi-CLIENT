import maskotKora from '../assets/img/BonekaKoRa-removebg.png'

// Membuat KoRa jadi "teman belajar transaksi cerdas" yang muncul kontekstual
// di tiap modul — bukan cuma dekorasi statis di beranda.
function KoraNote({ children }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <img src={maskotKora} alt="Maskot KoRa" className="h-9 w-9 shrink-0 object-contain" />
      <p className="text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">
        <span className="font-semibold text-white">KoRa: </span>
        {children}
      </p>
    </div>
  )
}

export default KoraNote
