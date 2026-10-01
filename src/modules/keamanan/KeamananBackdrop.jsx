// Ilustrasi perlindungan konsumen: perisai waspada, kaca pembesar memeriksa
// QR, rambu peringatan, dan meja pengaduan (call center 131/157). Dipakai
// sebagai latar modul Keamanan — diburamkan secukupnya tapi tetap terlihat.
function KeamananBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 blur-[2.5px]">
        <svg
          className="pasar-drift h-full w-full"
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="aman-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5F3FF" />
              <stop offset="60%" stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
            <linearGradient id="shield" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>

          <rect width="1440" height="810" fill="url(#aman-sky)" />

          {/* Awan */}
          <g fill="#FFFFFF" opacity="0.9">
            <ellipse cx="240" cy="130" rx="95" ry="26" />
            <ellipse cx="320" cy="112" rx="60" ry="20" />
            <ellipse cx="1080" cy="100" rx="105" ry="24" />
            <ellipse cx="1160" cy="82" rx="58" ry="18" />
          </g>

          {/* Perisai besar */}
          <g>
            <ellipse cx="270" cy="560" rx="150" ry="24" fill="#4C1D95" opacity="0.12" />
            <path
              d="M270 200 L430 260 V400 C430 510 350 570 270 600 C190 570 110 510 110 400 V260 Z"
              fill="url(#shield)"
              stroke="#4C1D95"
              strokeWidth="8"
            />
            <path
              d="M270 240 L390 285 V395 C390 480 325 530 270 552 C215 530 150 480 150 395 V285 Z"
              fill="none"
              stroke="#DDD6FE"
              strokeWidth="5"
              opacity="0.7"
            />
            <path
              d="M215 390 L258 433 L330 340"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* QR + kaca pembesar */}
          <g>
            <rect x="560" y="330" width="220" height="220" rx="18" fill="#FFFFFF" stroke="#7C5CFF" strokeWidth="7" />
            <g fill="#4C1D95">
              <rect x="588" y="358" width="56" height="56" rx="8" />
              <rect x="696" y="358" width="56" height="56" rx="8" />
              <rect x="588" y="466" width="56" height="56" rx="8" />
              <rect x="660" y="422" width="40" height="40" rx="6" />
              <rect x="712" y="466" width="40" height="40" rx="6" />
              <rect x="660" y="482" width="24" height="24" rx="4" />
            </g>
            <g fill="#FFFFFF">
              <rect x="598" y="368" width="36" height="36" rx="6" />
              <rect x="706" y="368" width="36" height="36" rx="6" />
              <rect x="598" y="476" width="36" height="36" rx="6" />
            </g>
            {/* Kaca pembesar */}
            <circle cx="770" cy="500" r="72" fill="#FFFFFF" opacity="0.55" />
            <circle cx="770" cy="500" r="72" fill="none" stroke="#E8590C" strokeWidth="12" />
            <line x1="822" y1="552" x2="880" y2="610" stroke="#E8590C" strokeWidth="16" strokeLinecap="round" />
          </g>

          {/* Rambu peringatan */}
          <g>
            <polygon points="1050,300 1180,520 920,520" fill="#FBBF24" stroke="#92400E" strokeWidth="8" strokeLinejoin="round" />
            <rect x="1041" y="390" width="18" height="60" rx="9" fill="#451A03" />
            <circle cx="1050" cy="468" r="11" fill="#451A03" />
          </g>

          {/* Meja pengaduan */}
          <g>
            <rect x="990" y="600" width="330" height="90" rx="12" fill="#6D28D9" />
            <rect x="990" y="600" width="330" height="20" rx="10" fill="#8B5CF6" />
            {/* Headset */}
            <path d="M1070 560 a45 45 0 0 1 90 0" fill="none" stroke="#4C1D95" strokeWidth="10" strokeLinecap="round" />
            <rect x="1060" y="556" width="20" height="34" rx="9" fill="#4C1D95" />
            <rect x="1150" y="556" width="20" height="34" rx="9" fill="#4C1D95" />
            {/* Balon lapor */}
            <rect x="1210" y="470" width="150" height="64" rx="14" fill="#FFFFFF" stroke="#7C5CFF" strokeWidth="5" />
            <polygon points="1240,534 1230,556 1258,534" fill="#FFFFFF" />
            <text x="1285" y="509" textAnchor="middle" fontSize="28" fontWeight="800" fill="#6D28D9" fontFamily="inherit">
              131
            </text>
          </g>

          {/* Dokumen hak konsumen */}
          <g>
            <rect x="560" y="600" width="150" height="110" rx="10" fill="#FFFFFF" stroke="#7C5CFF" strokeWidth="5" transform="rotate(-6 635 655)" />
            <g stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round">
              <line x1="596" y1="632" x2="676" y2="624" />
              <line x1="600" y1="654" x2="680" y2="646" />
              <line x1="604" y1="676" x2="656" y2="671" />
            </g>
            <path d="M586 690 l12 12 l22 -24" fill="none" stroke="#059669" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Tanah */}
          <rect y="690" width="1440" height="120" fill="#C4B5FD" />
          <rect y="690" width="1440" height="12" fill="#7C5CFF" opacity="0.5" />
        </svg>
      </div>

      {/* Sapuan putih-ungu agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3FF]/75 via-[#F5F3FF]/45 to-[#F5F3FF]/90" />
    </div>
  )
}

export default KeamananBackdrop
