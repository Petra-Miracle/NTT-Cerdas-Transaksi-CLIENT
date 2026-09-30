import { ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { submitPemahamanAttempt } from '../services/api'
import OptionCard from './OptionCard'

const SOAL_CHECK = [
  {
    id: 1,
    tanya: 'Saat pembeli memindai QR code toko, hal pertama yang paling krusial diverifikasi adalah:',
    opsi: [
      { label: 'Nama toko pada hasil scan harus sesuai dengan nama tokomu', benar: true },
      { label: 'Warna stiker QRIS di meja terlihat masih bagus', benar: false },
      { label: 'Jenis aplikasi HP yang dipakai pembeli', benar: false },
    ],
  },
  {
    id: 2,
    tanya: 'Bukti pembayaran QRIS yang paling sah adalah:',
    opsi: [
      { label: 'Notifikasi resmi di perangkat atau rekening pedagang sendiri', benar: true },
      { label: 'Tampilan screenshot di layar HP pembeli', benar: false },
      { label: 'Ucapan lisan pembeli bahwa transaksi sudah berhasil', benar: false },
    ],
  },
  {
    id: 3,
    tanya: 'Untuk transaksi QRIS dinamis (nominal berubah tiap belanja), kepastian angka diperiksa di:',
    opsi: [
      { label: 'Nominal di perangkat pedagang sendiri sebelum barang diserahkan', benar: true },
      { label: 'Catatan nota manual tanpa mencocokkan layar', benar: false },
      { label: 'Perkiraan harga oleh pembeli', benar: false },
    ],
  },
]

function KnowledgeCheck({ phase = 'awal', onComplete }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const current = SOAL_CHECK[index]
  const isLast = index === SOAL_CHECK.length - 1

  const handleNext = () => {
    if (selected === null) return
    const isCorrect = current.opsi[selected].benar
    const nextCount = correctCount + (isCorrect ? 1 : 0)

    if (isLast) {
      setCorrectCount(nextCount)
      setIsFinished(true)
      submitPemahamanAttempt({ modul: 'keamanan', fase: phase, skor: nextCount, totalCount: SOAL_CHECK.length })
      onComplete?.(nextCount)
      return
    }

    setCorrectCount(nextCount)
    setIndex((prev) => prev + 1)
    setSelected(null)
  }

  if (isFinished) {
    return (
      <div className="callout-slot flex flex-col gap-2 border border-[var(--color-rust)]/30 bg-black p-5">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-[var(--color-sage)]" aria-hidden="true" />
          <p className="text-sm font-bold text-white">
            Pencek Pemahaman ({phase === 'awal' ? 'Sebelum Materi' : 'Setelah Materi'}): {correctCount} dari {SOAL_CHECK.length} poin
          </p>
        </div>
        <p className="text-xs text-[var(--color-ink-on-bg-muted)]">
          {phase === 'awal'
            ? 'Bagus! Sekarang selesaikan 3 skenario interaktif di bawah untuk memperdalam pemahamanmu.'
            : 'Terima kasih telah menguji pemahaman akhirmu. Nilai pemahamanmu dicatat anonim untuk mengukur efektivitas edukasi.'}
        </p>
      </div>
    )
  }

  return (
    <div className="panel-glow panel-glow-neutral flex flex-col gap-4 p-5 sm:p-6" data-testid={`knowledge-check-${phase}`}>
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-[var(--color-rust)]" aria-hidden="true" />
          <h3 className="text-sm font-bold text-white">
            Uji Pemahaman Singkat ({phase === 'awal' ? 'Pre-Test' : 'Post-Test'}) · {index + 1}/{SOAL_CHECK.length}
          </h3>
        </div>
      </div>

      <p className="text-xs font-medium text-[var(--color-ink-on-bg-muted)]">{current.tanya}</p>

      <div className="flex flex-col gap-2">
        {current.opsi.map((item, optIdx) => (
          <OptionCard
            key={item.label}
            name={`check-${phase}-${index}`}
            value={optIdx}
            checked={selected === optIdx}
            onChange={() => setSelected(optIdx)}
          >
            <span className="text-xs">{item.label}</span>
          </OptionCard>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary-rust w-fit self-end !px-4 !py-2 !text-xs"
        disabled={selected === null}
        onClick={handleNext}
      >
        {isLast ? 'Lihat ringkasan' : 'Lanjut'}
        <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

export default KnowledgeCheck
