import { Accordion, Button, ToggleButton, buttonVariants } from '@heroui/react'
import { ArrowRight, Check, Lightbulb, Receipt, TrendingDown, TrendingUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import KoraNote from '../../components/KoraNote'
import { formatJam, formatRupiah } from '../../utils/format'
import { playKoraSound } from '../../utils/koraSound'
import {
  BI_QRIS_URL,
  DISCLAIMER,
  KORA_PESAN_SELESAI,
  MANFAAT_UMUM,
  PENGALAMAN_INFO,
  PENGALAMAN_KOSONG_MESSAGE,
  REKOMENDASI,
  TIDAK_PERNAH_VALUE,
} from './kalkulatorContent'

const MODES = [
  { id: 'harian', label: 'Harian', factor: 1 / 30, suffix: '/hari', kata: 'hari' },
  { id: 'mingguan', label: 'Mingguan', factor: 7 / 30, suffix: '/minggu', kata: 'minggu' },
  { id: 'bulanan', label: 'Bulanan', factor: 1, suffix: '/bulan', kata: 'bulan' },
]

const COIN_RAIN = [
  { left: '4%', size: 22, delay: '0s', duration: '5.2s' },
  { left: '12%', size: 14, delay: '1.1s', duration: '6.1s' },
  { left: '20%', size: 26, delay: '0.4s', duration: '5.6s' },
  { left: '29%', size: 12, delay: '2s', duration: '6.6s' },
  { left: '37%', size: 20, delay: '0.9s', duration: '5s' },
  { left: '46%', size: 15, delay: '1.6s', duration: '6.3s' },
  { left: '54%', size: 24, delay: '0.2s', duration: '5.4s' },
  { left: '63%', size: 13, delay: '2.4s', duration: '6.8s' },
  { left: '71%', size: 21, delay: '1.3s', duration: '5.8s' },
  { left: '80%', size: 16, delay: '0.7s', duration: '6s' },
  { left: '88%', size: 25, delay: '1.9s', duration: '5.3s' },
  { left: '95%', size: 14, delay: '0.1s', duration: '6.4s' },
]

function KalkulatorResult({ answers, result, onReset }) {
  const { omzetHarian, pengalaman, punyaRekening } = answers
  const { uangTunaiPerBulan, jamPerBulan, nilaiWaktuBulanan } = result
  const [modeId, setModeId] = useState('bulanan')

  const mode = MODES.find((item) => item.id === modeId)
  const jamTampil = jamPerBulan * mode.factor
  const nilaiTampil = Math.round(nilaiWaktuBulanan * mode.factor)

  const pengalamanDipilih = pengalaman.filter((item) => item !== TIDAK_PERNAH_VALUE)
  const tidakAdaPengalaman = pengalamanDipilih.length === 0

  const manfaatList = [...pengalamanDipilih.map((item) => PENGALAMAN_INFO[item].manfaat), ...MANFAAT_UMUM]

  // Perayaan kecil tiap hasil muncul: hujan koin + "ding!".
  useEffect(() => {
    playKoraSound('correct')
  }, [])

  return (
    <div
      className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-6 overflow-hidden rounded-[24px] border border-orange-100 bg-white/95 p-5 shadow-xl shadow-orange-200/50 backdrop-blur-sm sm:gap-8 sm:rounded-[28px] sm:p-8 lg:p-14"
      data-testid="kalkulator-result"
    >
      {/* Hujan koin */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {COIN_RAIN.map((coin, i) => (
          <span
            key={i}
            className="coin-rain absolute -top-8 rounded-full"
            style={{
              left: coin.left,
              width: coin.size,
              height: coin.size,
              background: 'linear-gradient(180deg, #FDBA74, #E8590C)',
              boxShadow: '0 4px 10px rgb(232 89 12 / 0.35)',
              animationDelay: coin.delay,
              animationDuration: coin.duration,
            }}
          />
        ))}
      </div>

      {/* Hero angka + tab periode */}
      <div className="relative flex w-full flex-col items-center gap-4 text-center">
        {/* ToggleButton HeroUI mandiri (bukan ToggleButtonGroup) supaya tetap
            tombol ber-aria-pressed seperti sebelumnya, bukan radio. */}
        <div
          role="group"
          aria-label="Pilih periode tampilan"
          className="inline-flex rounded-full border border-[color-mix(in_oklab,var(--accent)_25%,white)] bg-[var(--accent-soft)] p-1"
        >
          {MODES.map((item) => (
            <ToggleButton
              key={item.id}
              isSelected={modeId === item.id}
              onChange={() => setModeId(item.id)}
              variant="ghost"
              className="h-11 min-w-[88px] rounded-full px-4 text-[13px] font-bold text-[var(--accent-soft-foreground)] data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-white data-[selected=true]:shadow"
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <div key={modeId} className="number-pop flex flex-col items-center gap-2">
          <p className="text-xs font-black tracking-widest text-[#E8590C] uppercase">
            Waktu yang selama ini terbuang menghitung uang tunai
          </p>
          <p className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            {formatJam(jamTampil)}
          </p>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            per {mode.kata} menghitung &amp; menyetor uang tunai — setara{' '}
            <strong className="text-slate-900">
              {formatRupiah(nilaiTampil)}
              {mode.suffix}
            </strong>{' '}
            kalau waktumu dihargai ~Rp15.000/jam
          </p>
        </div>
      </div>

      <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2 text-center text-sm font-medium text-slate-700 sm:rounded-full">
        <Receipt size={16} className="text-[#E8590C]" aria-hidden="true" />
        {formatRupiah(omzetHarian)}/hari × 30 hari = <strong>{formatRupiah(uangTunaiPerBulan)}</strong>
      </div>

      <Accordion
        allowsMultipleExpanded
        defaultExpandedKeys={['tunai', 'manfaat']}
        className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6"
      >
        <Accordion.Item id="tunai" className="rounded-[20px] border border-red-200 bg-red-50/70">
          <Accordion.Heading>
            <Accordion.Trigger className="min-h-[56px] gap-2.5 px-5 py-4 sm:px-7 sm:pt-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <TrendingDown size={18} className="text-red-600" aria-hidden="true" />
              </span>
              <span className="flex-1 text-left font-display text-[17px] font-bold text-slate-900">
                Sisi tunai yang kamu alami
              </span>
              <Accordion.Indicator className="text-slate-400" />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="flex flex-col gap-4 px-5 pb-5 sm:px-7 sm:pb-7">
              {tidakAdaPengalaman ? (
                <p className="text-sm leading-relaxed text-slate-600">{PENGALAMAN_KOSONG_MESSAGE}</p>
              ) : (
                pengalamanDipilih.map((item) => {
                  const info = PENGALAMAN_INFO[item]
                  return (
                    <div key={item} className="flex flex-col gap-2">
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="mt-1 shrink-0 text-red-500" aria-hidden="true" />
                        <p className="text-sm leading-relaxed text-slate-600">
                          <span className="font-semibold text-slate-900">{info.label}. </span>
                          {info.kerugian}
                        </p>
                      </div>
                      {info.tips && (
                        <div className="ml-6 flex items-start gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-red-100">
                          <Lightbulb size={14} className="mt-0.5 shrink-0 text-[#E8590C]" aria-hidden="true" />
                          <p className="text-sm leading-relaxed text-slate-600">{info.tips}</p>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item id="manfaat" className="rounded-[20px] border border-emerald-200 bg-emerald-50/70">
          <Accordion.Heading>
            <Accordion.Trigger className="min-h-[56px] gap-2.5 px-5 py-4 sm:px-7 sm:pt-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingUp size={18} className="text-emerald-600" aria-hidden="true" />
              </span>
              <span className="flex-1 text-left font-display text-[17px] font-bold text-slate-900">
                Manfaat QRIS untukmu
              </span>
              <Accordion.Indicator className="text-slate-400" />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="flex flex-col gap-4 px-5 pb-5 sm:px-7 sm:pb-7">
              {manfaatList.map((manfaat, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <Check size={14} className="mt-1 shrink-0 text-emerald-600" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate-600">{manfaat}</p>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <div className="flex w-full items-center gap-4 rounded-2xl bg-slate-900 px-5 py-4 sm:px-6 sm:py-5" data-testid="kalk-message">
        <p className="text-sm leading-relaxed font-medium text-white">{REKOMENDASI[punyaRekening]}</p>
      </div>

      <div className="w-full max-w-md">
        <KoraNote tone="light">{KORA_PESAN_SELESAI}</KoraNote>
      </div>

      <p className="text-center text-xs text-slate-500 italic">{DISCLAIMER}</p>

      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:justify-center">
        <a
          href={BI_QRIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'primary', className: 'btn-cta w-full shadow-lg shadow-orange-500/30 sm:w-auto' })}
        >
          Yuk Daftar QRIS Sekarang
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        <Button
          variant="outline"
          className="btn-cta btn-accent-outline w-full sm:w-auto"
          onPress={onReset}
        >
          ↻ Hitung ulang
        </Button>
      </div>
    </div>
  )
}

export default KalkulatorResult
