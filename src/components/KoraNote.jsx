import maskotKora from '../assets/img/BonekaKoRa-removebg.png'

// Membuat KoRa jadi "teman belajar transaksi cerdas" yang muncul kontekstual
// di tiap modul — bukan cuma dekorasi statis di beranda.
function KoraNote({ children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <img src={maskotKora} alt="Maskot KoRa" className="h-12 w-12 shrink-0 object-contain" />
      <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg)]">
        <span className="font-bold text-white">KoRa: </span>
        {children}
      </p>
    </div>
  )
}

export default KoraNote
