import { ArrowRight, Lightbulb, Receipt, Sparkles, TrendingDown, TrendingUp, X, Check } from 'lucide-react'
import { formatJam, formatRupiah } from '../../utils/format'
import {
  BI_QRIS_URL,
  DISCLAIMER,
  MANFAAT_UMUM,
  PENGALAMAN_INFO,
  PENGALAMAN_KOSONG_MESSAGE,
  REKOMENDASI,
  TIDAK_PERNAH_VALUE,
} from './kalkulatorContent'

const COINS = [
  { className: 'top-0 left-2 h-9 w-9', rotate: '-10deg', delay: '0s' },
  { className: 'top-2 right-6 h-7 w-7', rotate: '12deg', delay: '0.6s' },
  { className: 'bottom-0 right-0 h-5 w-5', rotate: '-6deg', delay: '1.1s' },
]

function KalkulatorResult({ answers, result, onReset }) {
  const { omzetHarian, pengalaman, punyaRekening } = answers
  const { uangTunaiPerBulan, jamPerBulan, nilaiWaktuBulanan } = result

  const pengalamanDipilih = pengalaman.filter((item) => item !== TIDAK_PERNAH_VALUE)
  const tidakAdaPengalaman = pengalamanDipilih.length === 0

  const manfaatList = [...pengalamanDipilih.map((item) => PENGALAMAN_INFO[item].manfaat), ...MANFAAT_UMUM]

  return (
    <div
      className="panel-glow panel-glow-indigo mx-auto flex w-full max-w-[1100px] flex-col items-center gap-10 p-6 sm:p-14"
      data-testid="kalkulator-result"
    >
      <div className="relative flex w-full max-w-[420px] flex-col items-center gap-2 py-4 text-center">
        {COINS.map((coin, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${coin.className}`}
            style={{
              background: 'linear-gradient(180deg, var(--color-ochre-light), var(--color-ochre))',
              '--coin-rotate': coin.rotate,
              animation: `coin-float 3.6s ease-in-out ${coin.delay} infinite`,
            }}
            aria-hidden="true"
          />
        ))}
        <p className="text-xs font-semibold tracking-wide text-[var(--color-ink-on-bg-muted)] uppercase">
          Waktu yang selama ini terbuang menghitung uang tunai
        </p>
        <p className="text-6xl font-bold text-[var(--color-ochre)] sm:text-7xl">{formatJam(jamPerBulan)}</p>
        <p className="max-w-md text-sm text-[var(--color-ink-on-bg-muted)]">
          per bulan menghitung &amp; menyetor uang tunai — setara{' '}
          <strong className="text-white">{formatRupiah(nilaiWaktuBulanan)}/bulan</strong> kalau waktumu
          dihargai ~Rp15.000/jam
        </p>
      </div>

      <div className="pill-badge gap-2 !text-[var(--color-ink-on-bg)]">
        <Receipt size={16} className="text-[var(--color-ink-on-bg-muted)]" aria-hidden="true" />
        {formatRupiah(omzetHarian)}/hari × 30 hari = <strong>{formatRupiah(uangTunaiPerBulan)}</strong>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <section
          className="flex flex-col gap-4 rounded-[20px] border border-[#FF7A5933] bg-[#FF7A590D] p-7"
          aria-label="Sisi tunai yang selama ini kamu alami"
        >
          <div className="flex items-center gap-2.5">
            <span className="icon-chip h-9 w-9 border-none bg-[#FF7A591F]">
              <TrendingDown size={18} className="text-[var(--color-rust)]" aria-hidden="true" />
            </span>
            <h3 className="text-[17px] font-bold text-white">Sisi tunai yang kamu alami</h3>
          </div>

          {tidakAdaPengalaman ? (
            <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">
              {PENGALAMAN_KOSONG_MESSAGE}
            </p>
          ) : (
            pengalamanDipilih.map((item) => {
              const info = PENGALAMAN_INFO[item]
              return (
                <div key={item} className="flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <X size={14} className="mt-1 shrink-0 text-[var(--color-rust)]" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">
                      <span className="font-semibold text-white">{info.label}. </span>
                      {info.kerugian}
                    </p>
                  </div>
                  {info.tips && (
                    <div className="ml-6 flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2">
                      <Lightbulb size={14} className="mt-0.5 shrink-0 text-[var(--color-ochre)]" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-[var(--color-ink-on-bg-muted)]">{info.tips}</p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </section>

        <section
          className="flex flex-col gap-4 rounded-[20px] border border-[#5CE0B033] bg-[#5CE0B00D] p-7"
          aria-label="Manfaat konkret QRIS untukmu"
        >
          <div className="flex items-center gap-2.5">
            <span className="icon-chip h-9 w-9 border-none bg-[#5CE0B01F]">
              <TrendingUp size={18} className="text-[var(--color-sage)]" aria-hidden="true" />
            </span>
            <h3 className="text-[17px] font-bold text-white">Manfaat QRIS untukmu</h3>
          </div>
          {manfaatList.map((manfaat, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <Check size={14} className="mt-1 shrink-0 text-[var(--color-sage)]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[var(--color-ink-on-bg-muted)]">{manfaat}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="callout-slot flex w-full items-center gap-4" data-testid="kalk-message">
        <Sparkles size={22} className="shrink-0 text-[var(--color-ochre)]" aria-hidden="true" />
        <p className="text-sm leading-relaxed font-medium text-[var(--color-ink-on-bg)]">
          {REKOMENDASI[punyaRekening]}
        </p>
      </div>

      <p className="text-center text-xs italic text-[var(--color-ink-on-bg-muted)]">{DISCLAIMER}</p>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a href={BI_QRIS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Yuk Daftar QRIS Sekarang
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        <button type="button" className="btn-ghost" onClick={onReset}>
          ↻ Hitung ulang
        </button>
      </div>
    </div>
  )
}

export default KalkulatorResult
