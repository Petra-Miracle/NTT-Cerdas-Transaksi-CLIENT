import { Alert, Button, Card, Chip, RadioGroup } from '@heroui/react'
import { ArrowRight, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { submitPemahamanAttempt } from '../services/api'
import { RadioOption } from './OptionCard'

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
      <Alert status="success" className="items-start">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title className="font-bold">
            Pencek Pemahaman ({phase === 'awal' ? 'Sebelum Materi' : 'Setelah Materi'}): {correctCount} dari {SOAL_CHECK.length} poin
          </Alert.Title>
          <Alert.Description className="text-sm leading-relaxed text-slate-600">
            {phase === 'awal'
              ? 'Bagus! Sekarang selesaikan 3 skenario interaktif di bawah untuk memperdalam pemahamanmu.'
              : 'Terima kasih telah menguji pemahaman akhirmu. Nilai pemahamanmu dicatat anonim untuk mengukur efektivitas edukasi.'}
          </Alert.Description>
        </Alert.Content>
      </Alert>
    )
  }

  return (
    <Card className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-5 sm:p-6" data-testid={`knowledge-check-${phase}`}>
      <Card.Header className="flex flex-row flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-[var(--accent)]" aria-hidden="true" />
          <Card.Title className="text-base font-bold text-slate-900">
            Uji Pemahaman Singkat ({phase === 'awal' ? 'Pre-Test' : 'Post-Test'})
          </Card.Title>
        </div>
        <Chip color="accent" variant="soft" size="sm" className="font-bold">
          {index + 1}/{SOAL_CHECK.length}
        </Chip>
      </Card.Header>

      <RadioGroup
        key={current.id}
        aria-label={current.tanya}
        name={`check-${phase}-${index}`}
        value={selected === null ? null : String(selected)}
        onChange={(value) => setSelected(Number(value))}
        className="flex flex-col gap-2.5"
      >
        <p className="text-[15px] font-semibold text-slate-800">{current.tanya}</p>
        {current.opsi.map((item, optIdx) => (
          <RadioOption key={item.label} value={String(optIdx)}>
            {item.label}
          </RadioOption>
        ))}
      </RadioGroup>

      <Button
        variant="primary"
        className="btn-cta w-full sm:w-fit sm:self-end"
        isDisabled={selected === null}
        onPress={handleNext}
      >
        {isLast ? 'Lihat ringkasan' : 'Lanjut'}
        <ArrowRight size={14} aria-hidden="true" />
      </Button>
    </Card>
  )
}

export default KnowledgeCheck
