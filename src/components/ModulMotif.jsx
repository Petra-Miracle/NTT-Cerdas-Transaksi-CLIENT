// Motif latar kartu modul beranda — ilustrasi garis sederhana sesuai tema
// tiap modul: koin (hemat), segitiga peringatan + QR (waspada), kipas uang
// rupiah (CBP), dan anyaman tenun (produk lokal).
function ModulMotif({ kind }) {
  if (kind === 'kalkulator') {
    return (
      <svg
        className="pointer-events-none absolute -right-8 -bottom-8 h-52 w-52 opacity-30"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <rect x="96" y="60" width="84" height="110" rx="12" fill="none" stroke="#FFFFFF" strokeWidth="9" />
        <rect x="112" y="80" width="52" height="24" rx="6" fill="#FFFFFF" opacity="0.85" />
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="116" cy="122" r="6" />
          <circle cx="132" cy="122" r="6" />
          <circle cx="148" cy="122" r="6" />
          <circle cx="116" cy="140" r="6" />
          <circle cx="132" cy="140" r="6" />
          <circle cx="148" cy="140" r="6" />
        </g>
        <circle cx="52" cy="140" r="30" fill="none" stroke="#FFFFFF" strokeWidth="9" />
        <text x="52" y="152" textAnchor="middle" fontSize="26" fontWeight="900" fill="#FFFFFF">
          Rp
        </text>
        <circle cx="52" cy="52" r="20" fill="#FFFFFF" opacity="0.75" />
        <text x="52" y="60" textAnchor="middle" fontSize="18" fontWeight="900" fill="#E8590C">
          Rp
        </text>
      </svg>
    )
  }

  if (kind === 'keamanan') {
    return (
      <svg
        className="pointer-events-none absolute -right-8 -bottom-8 h-52 w-52 opacity-30"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <polygon points="100,18 182,160 18,160" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinejoin="round" />
        <rect x="92" y="72" width="16" height="46" rx="8" fill="#FFFFFF" />
        <circle cx="100" cy="136" r="10" fill="#FFFFFF" />
        <g fill="#FFFFFF" opacity="0.8">
          <rect x="18" y="150" width="26" height="26" rx="5" />
          <rect x="50" y="150" width="26" height="26" rx="5" />
          <rect x="18" y="182" width="26" height="26" rx="5" opacity="0" />
        </g>
      </svg>
    )
  }

  if (kind === 'kuis') {
    const bills = [
      { nominal: '2.000', bg: '#9CA3AF', rotate: -18, x: 30, y: 96 },
      { nominal: '5.000', bg: '#A16207', rotate: -9, x: 44, y: 104 },
      { nominal: '10.000', bg: '#7C3AED', rotate: 0, x: 58, y: 110 },
      { nominal: '20.000', bg: '#16A34A', rotate: 9, x: 72, y: 114 },
      { nominal: '50.000', bg: '#2563EB', rotate: 18, x: 86, y: 116 },
    ]
    return (
      <svg
        className="pointer-events-none absolute -right-6 -bottom-10 h-56 w-56 opacity-90"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        {bills.map((bill) => (
          <g key={bill.nominal} transform={`rotate(${bill.rotate} 100 180)`}>
            <rect x={bill.x} y={bill.y} width="86" height="44" rx="6" fill={bill.bg} stroke="#FFFFFF" strokeWidth="2.5" />
            <text x={bill.x + 43} y={bill.y + 29} textAnchor="middle" fontSize="17" fontWeight="900" fill="#FFFFFF">
              {bill.nominal}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  // produklokal — anyaman tenun
  return (
    <svg
      className="pointer-events-none absolute -right-8 -bottom-8 h-52 w-52 opacity-30"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <defs>
        <pattern id="modul-tenun" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M26 5 47 26 26 47 5 26Z" fill="none" stroke="#FDE68A" strokeWidth="3" />
          <circle cx="26" cy="26" r="3.5" fill="#FDE68A" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#modul-tenun)" />
    </svg>
  )
}

export default ModulMotif
