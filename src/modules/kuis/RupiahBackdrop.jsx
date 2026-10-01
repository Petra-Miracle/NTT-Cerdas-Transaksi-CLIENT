// Latar Kuis CBP Rupiah: uang kertas nominal seribu sampai seratus ribu yang
// melayang (animasi CSS) di atas sapuan putih-merah muda.
const NOTES = [
  { nominal: '1.000', bg: '#6B7280', fg: '#F9FAFB', left: '2%', top: '6%', size: 1, delay: '0s', duration: '11s' },
  { nominal: '2.000', bg: '#9CA3AF', fg: '#111827', left: '78%', top: '4%', size: 0.9, delay: '1.4s', duration: '13s' },
  { nominal: '5.000', bg: '#A16207', fg: '#FEF3C7', left: '12%', top: '66%', size: 1.05, delay: '0.7s', duration: '12s' },
  { nominal: '10.000', bg: '#7C3AED', fg: '#EDE9FE', left: '86%', top: '58%', size: 1, delay: '2.1s', duration: '10s' },
  { nominal: '20.000', bg: '#16A34A', fg: '#DCFCE7', left: '45%', top: '2%', size: 0.85, delay: '0.3s', duration: '14s' },
  { nominal: '50.000', bg: '#2563EB', fg: '#DBEAFE', left: '66%', top: '76%', size: 1.1, delay: '1s', duration: '11s' },
  { nominal: '100.000', bg: '#DC2626', fg: '#FEE2E2', left: '30%', top: '82%', size: 1.15, delay: '1.8s', duration: '12.5s' },
]

function RupiahBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        {NOTES.map((note) => (
          <div
            key={note.nominal}
            className="rupiah-float absolute"
            style={{ left: note.left, top: note.top, animationDelay: note.delay, animationDuration: note.duration }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 opacity-70 shadow-lg blur-[0.6px]"
              style={{
                background: note.bg,
                color: note.fg,
                transform: `scale(${note.size}) rotate(-8deg)`,
              }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-current text-[10px] font-black opacity-80">
                Rp
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-black tracking-tight">{note.nominal}</span>
                <span className="block text-[8px] font-bold tracking-[0.2em] opacity-80">BANK INDONESIA</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sapuan putih-merah muda agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1F2]/80 via-[#FFF1F2]/55 to-[#FFF1F2]/90" />
    </div>
  )
}

export default RupiahBackdrop
