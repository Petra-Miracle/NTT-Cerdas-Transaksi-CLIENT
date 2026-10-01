// Motif dekoratif tiap tema kartu — siluet sederhana bervolume rendah agar
// teks tetap terbaca.
function KartuMotif({ motif }) {
  const common = 'pointer-events-none absolute inset-0 h-full w-full'

  if (motif === 'beans') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="#D6A05F" opacity="0.5">
          <ellipse cx="60" cy="60" rx="34" ry="24" transform="rotate(-24 60 60)" />
          <ellipse cx="330" cy="50" rx="38" ry="26" transform="rotate(18 330 50)" />
          <ellipse cx="90" cy="200" rx="40" ry="27" transform="rotate(12 90 200)" />
          <ellipse cx="310" cy="205" rx="34" ry="24" transform="rotate(-16 310 205)" />
          <ellipse cx="200" cy="130" rx="44" ry="30" transform="rotate(6 200 130)" />
        </g>
        <g stroke="#2A1A0E" strokeWidth="5" opacity="0.55" fill="none">
          <path d="M32 52 Q60 60 88 68" />
          <path d="M298 42 Q330 50 362 58" />
          <path d="M56 192 Q90 200 124 208" />
          <path d="M282 197 Q310 205 338 213" />
          <path d="M162 122 Q200 130 238 138" />
        </g>
      </svg>
    )
  }

  if (motif === 'strings') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="#D1FAE5" strokeWidth="3" opacity="0.55">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={60 + i * 35} y1="10" x2={60 + i * 35} y2="250" />
          ))}
        </g>
        <ellipse cx="200" cy="210" rx="110" ry="34" fill="#FDE68A" opacity="0.35" />
        <ellipse cx="200" cy="200" rx="70" ry="22" fill="none" stroke="#FDE68A" strokeWidth="4" opacity="0.6" />
      </svg>
    )
  }

  if (motif === 'batik') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="#FFFFFF" fill="none" opacity="0.4">
          <path d="M-20 200 Q100 120 220 160 T460 60" strokeWidth="10" />
          <path d="M-20 230 Q100 150 220 190 T460 90" strokeWidth="5" />
          <path d="M-20 120 Q120 40 240 90 T460 -10" strokeWidth="7" />
        </g>
        <g fill="#FFFFFF" opacity="0.5">
          <circle cx="80" cy="70" r="7" />
          <circle cx="330" cy="200" r="7" />
          <circle cx="200" cy="40" r="5" />
          <circle cx="250" cy="220" r="5" />
        </g>
      </svg>
    )
  }

  if (motif === 'stitch') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="#FDE68A" fill="none" strokeWidth="5" strokeDasharray="14 10" opacity="0.65" strokeLinecap="round">
          <path d="M-10 190 Q120 150 220 190 T430 160" />
          <path d="M-10 220 Q120 180 220 220 T430 190" />
        </g>
        <path d="M250 60 q60 10 90 70 q-50 20 -90 -10 q-30 -30 0 -60Z" fill="#FDE68A" opacity="0.3" />
      </svg>
    )
  }

  if (motif === 'factory') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="#111827" opacity="0.45">
          <rect x="40" y="140" width="180" height="120" rx="6" />
          <rect x="240" y="100" width="34" height="160" />
          <polygon points="40,140 130,80 220,140" />
        </g>
        <g fill="#FDE68A" opacity="0.7">
          <rect x="62" y="165" width="26" height="26" rx="4" />
          <rect x="102" y="165" width="26" height="26" rx="4" />
          <rect x="142" y="165" width="26" height="26" rx="4" />
        </g>
        <g fill="#FFFFFF" opacity="0.35">
          <ellipse cx="300" cy="70" rx="46" ry="14" />
          <ellipse cx="336" cy="60" rx="30" ry="11" />
        </g>
      </svg>
    )
  }

  if (motif === 'blocks') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g opacity="0.55">
          <rect x="40" y="150" width="64" height="64" rx="12" fill="#FDE047" transform="rotate(-12 72 182)" />
          <rect x="300" y="40" width="58" height="58" rx="12" fill="#67E8F9" transform="rotate(14 329 69)" />
          <rect x="310" y="160" width="52" height="52" rx="12" fill="#FDA4AF" transform="rotate(-8 336 186)" />
          <circle cx="90" cy="70" r="26" fill="#86EFAC" />
          <circle cx="200" cy="220" r="20" fill="#FDBA74" />
        </g>
      </svg>
    )
  }

  if (motif === 'salt') {
    return (
      <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.7">
          <path d="M70 60 h28 M84 46 v28" />
          <path d="M320 80 h24 M332 68 v24" />
          <path d="M210 50 h20 M220 40 v20" />
          <path d="M120 190 h24 M132 178 v24" />
        </g>
        <g stroke="#FFFFFF" fill="none" strokeWidth="6" opacity="0.5">
          <path d="M-10 220 Q80 200 160 220 T330 210 T430 220" />
          <path d="M-10 240 Q80 220 160 240 T330 230 T430 240" />
        </g>
      </svg>
    )
  }

  // weave (tenun) — default
  return (
    <svg className={common} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="kartu-weave" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M32 6 58 32 32 58 6 32Z" fill="none" stroke="#FDE68A" strokeWidth="3" />
          <circle cx="32" cy="32" r="4" fill="#FDE68A" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill="url(#kartu-weave)" opacity="0.55" />
    </svg>
  )
}

export default KartuMotif
