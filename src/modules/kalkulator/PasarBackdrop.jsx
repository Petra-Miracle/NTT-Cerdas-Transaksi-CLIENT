// Ilustrasi suasana pasar & toko sembako: kios berawning loreng oranye-putih,
// karung beras/gula, keranjang hasil tani, dan lampu gantung. Dipakai sebagai
// latar modul Kalkulator — diburamkan secukupnya tapi tetap terlihat.
function PasarBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 blur-[2.5px]">
        <svg
          className="pasar-drift h-full w-full"
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pasar-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="60%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
            <pattern id="awning" width="56" height="40" patternUnits="userSpaceOnUse">
              <rect width="56" height="40" fill="#FFF7ED" />
              <rect width="28" height="40" fill="#EA580C" />
            </pattern>
          </defs>

          <rect width="1440" height="810" fill="url(#pasar-sky)" />

          {/* Matahari + awan */}
          <circle cx="1220" cy="130" r="96" fill="#FDBA74" opacity="0.35" />
          <circle cx="1220" cy="130" r="62" fill="#FDBA74" opacity="0.9" />
          <g fill="#FFFFFF" opacity="0.9">
            <ellipse cx="260" cy="140" rx="90" ry="26" />
            <ellipse cx="330" cy="122" rx="60" ry="22" />
            <ellipse cx="700" cy="90" rx="100" ry="24" />
            <ellipse cx="780" cy="74" rx="56" ry="18" />
          </g>

          {/* Burung */}
          <g stroke="#C2410C" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
            <path d="M480 180 q14 -12 28 0 q14 -12 28 0" />
            <path d="M560 150 q10 -9 20 0 q10 -9 20 0" />
          </g>

          {/* Kios kiri — Pasar Murah */}
          <g>
            <rect x="120" y="360" width="16" height="220" fill="#92400E" />
            <rect x="380" y="360" width="16" height="220" fill="#92400E" />
            <polygon points="70,360 446,360 406,272 110,272" fill="url(#awning)" stroke="#C2410C" strokeWidth="5" />
            <g fill="#EA580C">
              <circle cx="110" cy="360" r="13" />
              <circle cx="162" cy="360" r="13" fill="#FFF7ED" />
              <circle cx="214" cy="360" r="13" />
              <circle cx="266" cy="360" r="13" fill="#FFF7ED" />
              <circle cx="318" cy="360" r="13" />
              <circle cx="370" cy="360" r="13" fill="#FFF7ED" />
              <circle cx="422" cy="360" r="13" />
            </g>
            <rect x="96" y="560" width="324" height="96" rx="10" fill="#B45309" />
            <rect x="96" y="560" width="324" height="18" rx="9" fill="#D97706" />
            <rect x="150" y="470" width="216" height="56" rx="8" fill="#7C2D12" />
            <text x="258" y="506" textAnchor="middle" fontSize="30" fontWeight="800" fill="#FFF7ED" fontFamily="inherit">
              PASAR
            </text>
            {/* Keranjang tomat */}
            <polygon points="120,620 220,620 205,668 135,668" fill="#A16207" />
            <circle cx="145" cy="612" r="14" fill="#EF4444" />
            <circle cx="172" cy="606" r="14" fill="#EF4444" />
            <circle cx="198" cy="612" r="14" fill="#EF4444" />
          </g>

          {/* Kios tengah — Sembako */}
          <g>
            <rect x="580" y="340" width="16" height="240" fill="#92400E" />
            <rect x="860" y="340" width="16" height="240" fill="#92400E" />
            <polygon points="530,340 926,340 886,248 570,248" fill="url(#awning)" stroke="#C2410C" strokeWidth="5" />
            <g fill="#EA580C">
              <circle cx="572" cy="340" r="13" />
              <circle cx="624" cy="340" r="13" fill="#FFF7ED" />
              <circle cx="676" cy="340" r="13" />
              <circle cx="728" cy="340" r="13" fill="#FFF7ED" />
              <circle cx="780" cy="340" r="13" />
              <circle cx="832" cy="340" r="13" fill="#FFF7ED" />
              <circle cx="884" cy="340" r="13" />
            </g>
            <rect x="556" y="560" width="344" height="96" rx="10" fill="#B45309" />
            <rect x="556" y="560" width="344" height="18" rx="9" fill="#D97706" />
            <rect x="618" y="452" width="220" height="56" rx="8" fill="#7C2D12" />
            <text x="728" y="488" textAnchor="middle" fontSize="30" fontWeight="800" fill="#FFF7ED" fontFamily="inherit">
              SEMBAKO
            </text>
            {/* Lampu gantung */}
            <line x1="660" y1="340" x2="660" y2="392" stroke="#78350F" strokeWidth="4" />
            <circle cx="660" cy="406" r="26" fill="#FDE68A" opacity="0.45" />
            <circle cx="660" cy="406" r="12" fill="#FDE68A" />
            <line x1="796" y1="340" x2="796" y2="392" stroke="#78350F" strokeWidth="4" />
            <circle cx="796" cy="406" r="26" fill="#FDE68A" opacity="0.45" />
            <circle cx="796" cy="406" r="12" fill="#FDE68A" />
          </g>

          {/* Karung beras & gula */}
          <g>
            <ellipse cx="1010" cy="640" rx="64" ry="20" fill="#00000022" />
            <rect x="952" y="540" width="116" height="104" rx="26" fill="#E7B15C" stroke="#92400E" strokeWidth="5" />
            <rect x="986" y="522" width="48" height="26" rx="10" fill="#92400E" />
            <text x="1010" y="602" textAnchor="middle" fontSize="26" fontWeight="800" fill="#7C2D12" fontFamily="inherit">
              BERAS
            </text>
            <ellipse cx="1170" cy="650" rx="54" ry="17" fill="#00000022" />
            <rect x="1122" y="562" width="96" height="90" rx="24" fill="#F5D78E" stroke="#92400E" strokeWidth="5" />
            <rect x="1150" y="546" width="40" height="24" rx="9" fill="#92400E" />
            <text x="1170" y="616" textAnchor="middle" fontSize="22" fontWeight="800" fill="#7C2D12" fontFamily="inherit">
              GULA
            </text>
            {/* Keranjang jeruk */}
            <polygon points="1240,610 1340,610 1326,656 1254,656" fill="#A16207" />
            <circle cx="1264" cy="602" r="13" fill="#F97316" />
            <circle cx="1290" cy="596" r="13" fill="#FB923C" />
            <circle cx="1315" cy="602" r="13" fill="#F97316" />
          </g>

          {/* Tanah */}
          <rect y="656" width="1440" height="154" fill="#FDBA74" />
          <rect y="656" width="1440" height="12" fill="#EA580C" opacity="0.55" />
          <g fill="#C2410C" opacity="0.35">
            <circle cx="200" cy="730" r="10" />
            <circle cx="520" cy="760" r="12" />
            <circle cx="900" cy="740" r="10" />
            <circle cx="1330" cy="750" r="12" />
          </g>
        </svg>
      </div>

      {/* Sapuan putih-oranye agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7ED]/75 via-[#FFF7ED]/45 to-[#FFF7ED]/90" />
    </div>
  )
}

export default PasarBackdrop
