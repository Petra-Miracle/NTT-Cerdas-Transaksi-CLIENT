// Latar modul Produk Lokal: kain tenun ikat NTT — lapisan motif belah ketupat
// yang melayang dengan animasi 3D (perspektif + goyangan ruang) di atas
// sapuan putih-biru tua.
function TenunBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#EFF6FF] to-[#DBEAFE]" />

      {/* Motif dasar tenun */}
      <svg className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 810">
        <defs>
          <pattern id="tenun-dasar" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10 110 60 60 110 10 60Z" fill="none" stroke="#1A5DAD" strokeWidth="3" opacity="0.35" />
            <path d="M60 35 85 60 60 85 35 60Z" fill="#1A5DAD" opacity="0.22" />
            <circle cx="60" cy="60" r="5" fill="#B8860B" opacity="0.5" />
            <circle cx="0" cy="0" r="4" fill="#1A5DAD" opacity="0.25" />
            <circle cx="120" cy="0" r="4" fill="#1A5DAD" opacity="0.25" />
            <circle cx="0" cy="120" r="4" fill="#1A5DAD" opacity="0.25" />
            <circle cx="120" cy="120" r="4" fill="#1A5DAD" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="1440" height="810" fill="url(#tenun-dasar)" />
      </svg>

      {/* Lapisan kain 3D */}
      <div className="tenun-stage absolute inset-0">
        <svg
          className="tenun-layer absolute -left-24 top-16 h-[420px] w-[520px] opacity-70 blur-[1px]"
          style={{ animationDelay: '0s' }}
          viewBox="0 0 520 420"
        >
          <defs>
            <linearGradient id="kain-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#1A5DAD" />
            </linearGradient>
            <pattern id="ikat-a" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M36 6 66 36 36 66 6 36Z" fill="none" stroke="#FDE68A" strokeWidth="3.5" />
              <path d="M36 22 50 36 36 50 22 36Z" fill="#FDE68A" opacity="0.85" />
            </pattern>
          </defs>
          <rect x="8" y="8" width="504" height="404" rx="26" fill="url(#kain-a)" />
          <rect x="8" y="8" width="504" height="404" rx="26" fill="url(#ikat-a)" />
          <rect x="8" y="8" width="504" height="404" rx="26" fill="none" stroke="#0B1E3A" strokeWidth="6" opacity="0.4" />
        </svg>

        <svg
          className="tenun-layer absolute -right-28 bottom-10 h-[460px] w-[560px] opacity-70 blur-[1px]"
          style={{ animationDelay: '-4.5s' }}
          viewBox="0 0 560 460"
        >
          <defs>
            <linearGradient id="kain-b" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0B1E3A" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <pattern id="ikat-b" width="84" height="84" patternUnits="userSpaceOnUse">
              <path d="M42 8 76 42 42 76 8 42Z" fill="none" stroke="#93C5FD" strokeWidth="3.5" />
              <circle cx="42" cy="42" r="7" fill="#FDE68A" />
            </pattern>
          </defs>
          <rect x="8" y="8" width="544" height="444" rx="26" fill="url(#kain-b)" />
          <rect x="8" y="8" width="544" height="444" rx="26" fill="url(#ikat-b)" />
          <rect x="8" y="8" width="544" height="444" rx="26" fill="none" stroke="#0B1E3A" strokeWidth="6" opacity="0.4" />
        </svg>

        {/* Benang melayang */}
        {[
          { left: '18%', top: '12%', delay: '0s', size: 18 },
          { left: '82%', top: '18%', delay: '1.2s', size: 14 },
          { left: '70%', top: '64%', delay: '0.6s', size: 20 },
          { left: '10%', top: '72%', delay: '1.8s', size: 14 },
          { left: '48%', top: '6%', delay: '2.4s', size: 16 },
        ].map((dot, i) => (
          <span
            key={i}
            className="tenun-float absolute block rotate-45 rounded-[4px] bg-[#1A5DAD]/30"
            style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size, animationDelay: dot.delay }}
          />
        ))}
      </div>

      {/* Sapuan putih-biru agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/45 to-[#DBEAFE]/85" />
    </div>
  )
}

export default TenunBackdrop
