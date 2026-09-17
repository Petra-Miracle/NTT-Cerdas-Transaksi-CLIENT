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

function KalkulatorResult({ answers, result, onReset }) {
  const { omzetHarian, pengalaman, punyaRekening } = answers
  const { uangTunaiPerBulan, jamPerBulan, nilaiWaktuBulanan } = result

  const pengalamanDipilih = pengalaman.filter((item) => item !== TIDAK_PERNAH_VALUE)
  const tidakAdaPengalaman = pengalamanDipilih.length === 0

  const manfaatList = [
    ...pengalamanDipilih.map((item) => PENGALAMAN_INFO[item].manfaat),
    ...MANFAAT_UMUM,
  ]

  return (
    <div
      className="panel-glow panel-glow-indigo mx-auto flex w-full max-w-[720px] flex-col gap-8 p-6 sm:p-10"
      data-testid="kalkulator-result"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm uppercase tracking-wide text-[var(--color-ink-on-bg-muted)]">
          Waktu yang selama ini terbuang menghitung uang tunai
        </p>
        <p className="text-5xl font-bold text-white sm:text-6xl">{formatJam(jamPerBulan)}</p>
        <p className="max-w-md text-sm text-[var(--color-ink-on-bg-muted)]">
          per bulan menghitung &amp; menyetor uang tunai — setara{' '}
          <strong className="text-white">{formatRupiah(nilaiWaktuBulanan)}/bulan</strong> kalau waktumu
          dihargai ~Rp15.000/jam
        </p>
      </div>

      <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[var(--color-ink-on-bg)]">
        <span className="font-semibold">Total uang tunai per bulan</span> = {formatRupiah(omzetHarian)}/hari ×
        30 hari = <strong className="text-white">{formatRupiah(uangTunaiPerBulan)}</strong>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section className="flex flex-col gap-3" aria-label="Sisi tunai yang selama ini kamu alami">
          <h3 className="text-base font-bold text-white">Sisi tunai yang selama ini kamu alami</h3>
          {tidakAdaPengalaman ? (
            <p className="rounded-xl bg-white text-[var(--color-ink)] px-4 py-3 text-sm">
              {PENGALAMAN_KOSONG_MESSAGE}
            </p>
          ) : (
            pengalamanDipilih.map((item) => {
              const info = PENGALAMAN_INFO[item]
              return (
                <div key={item} className="rounded-xl bg-white px-4 py-3 text-sm text-[var(--color-ink)]">
                  <p className="font-semibold">{info.label}</p>
                  <p className="mt-1 text-[var(--color-ink-muted)]">{info.kerugian}</p>
                  {info.tips && (
                    <p className="mt-2 rounded-lg bg-[var(--color-ochre)]/10 px-3 py-2 text-xs text-[var(--color-ochre-dark)]">
                      Tips CBP Rupiah: {info.tips}
                    </p>
                  )}
                </div>
              )
            })
          )}
        </section>

        <section className="flex flex-col gap-3" aria-label="Manfaat konkret QRIS untukmu">
          <h3 className="text-base font-bold text-white">Manfaat konkret QRIS untukmu</h3>
          {manfaatList.map((manfaat, index) => (
            <div key={index} className="rounded-xl bg-white px-4 py-3 text-sm text-[var(--color-ink)]">
              {manfaat}
            </div>
          ))}
        </section>
      </div>

      <div className="rounded-xl bg-white px-4 py-3 text-sm text-[var(--color-ink)]" data-testid="kalk-message">
        {REKOMENDASI[punyaRekening]}
      </div>

      <p className="text-center text-xs italic text-[var(--color-ink-on-bg-muted)]">{DISCLAIMER}</p>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={BI_QRIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Yuk Daftar QRIS Sekarang →
        </a>
        <button type="button" className="btn-ghost" onClick={onReset}>
          ↻ Hitung ulang
        </button>
      </div>
    </div>
  )
}

export default KalkulatorResult
