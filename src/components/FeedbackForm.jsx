import {
  Alert,
  Button,
  Card,
  Checkbox,
  Description,
  Form,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from '@heroui/react'
import { MessageSquarePlus, Send } from 'lucide-react'
import { useState } from 'react'
import { submitFeedback } from '../services/api'

const RELEVANSI = [
  { value: 'ya', label: 'Ya, relevan' },
  { value: 'sebagian', label: 'Sebagian' },
  { value: 'tidak', label: 'Tidak' },
]

function FeedbackForm({ modul }) {
  const [pemahaman, setPemahaman] = useState(null)
  const [relevansi, setRelevansi] = useState(null)
  const [komentar, setKomentar] = useState('')
  const [laporanKonten, setLaporanKonten] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const canSubmit = pemahaman !== null && relevansi !== null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    submitFeedback({
      modul,
      pemahaman,
      relevansi,
      komentar: komentar.trim(),
      laporanKonten,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Alert status="success" role="status" className="items-start">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title className="font-bold">Terima kasih atas masukanmu.</Alert.Title>
          <Alert.Description className="text-sm text-slate-600">
            Jawaban anonim ini membantu kami menyempurnakan edukasi QRIS dan Rupiah untuk UMKM NTT.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    )
  }

  return (
    <Card
      render={(props) => <section {...props} />}
      className="flex w-full flex-col gap-5 rounded-[24px] border border-slate-200 p-5 sm:p-8"
      aria-labelledby={`feedback-${modul}`}
    >
      <Card.Header className="flex flex-row items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
          <MessageSquarePlus size={19} className="text-[var(--accent)]" aria-hidden="true" />
        </span>
        <div>
          <Card.Title id={`feedback-${modul}`} className="text-lg font-bold text-slate-900">
            Bantu Perbaiki Materi Ini
          </Card.Title>
          <Card.Description className="text-sm leading-relaxed text-slate-600">
            Tidak meminta nama atau nomor telepon. Jawab singkat agar materi makin berguna.
          </Card.Description>
        </div>
      </Card.Header>

      <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <RadioGroup
          name={`pemahaman-${modul}`}
          orientation="horizontal"
          value={pemahaman === null ? null : String(pemahaman)}
          onChange={(value) => setPemahaman(Number(value))}
          className="flex flex-col gap-2"
        >
          <Label className="text-sm font-semibold text-slate-900">
            1. Seberapa paham kamu setelah menyelesaikan modul ini?
          </Label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((nilai) => (
              <Radio key={nilai} value={String(nilai)}>
                <Radio.Content className="flex size-11 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700 transition data-[hovered=true]:border-[var(--accent)] data-[selected=true]:border-[var(--accent)] data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-white data-[focus-visible=true]:outline-3 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-[var(--focus)]">
                  {nilai}
                </Radio.Content>
              </Radio>
            ))}
          </div>
          <Description className="text-xs text-slate-500">1 = belum paham, 5 = sangat paham</Description>
        </RadioGroup>

        <RadioGroup
          name={`relevansi-${modul}`}
          orientation="horizontal"
          value={relevansi}
          onChange={setRelevansi}
          className="flex flex-col gap-2"
        >
          <Label className="text-sm font-semibold text-slate-900">2. Apakah materi ini relevan dengan kegiatanmu?</Label>
          <div className="flex flex-wrap gap-2">
            {RELEVANSI.map((option) => (
              <Radio key={option.value} value={option.value}>
                <Radio.Content className="inline-flex min-h-11 items-center rounded-full border-2 border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition data-[hovered=true]:border-[var(--accent)] data-[selected=true]:border-[var(--accent)] data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-white data-[focus-visible=true]:outline-3 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-[var(--focus)]">
                  {option.label}
                </Radio.Content>
              </Radio>
            ))}
          </div>
        </RadioGroup>

        <TextField value={komentar} onChange={setKomentar} maxLength={500} className="flex flex-col gap-2">
          <Label className="text-sm font-semibold text-slate-900">
            3. Bagian apa yang paling membantu atau masih membingungkan?{' '}
            <span className="font-normal text-slate-500">(opsional)</span>
          </Label>
          <TextArea rows={3} placeholder="Tulis masukanmu di sini..." className="w-full text-[15px]" />
          <Description className="text-xs text-slate-500">{komentar.length}/500 karakter</Description>
        </TextField>

        <Checkbox isSelected={laporanKonten} onChange={setLaporanKonten}>
          <Checkbox.Content className="items-start gap-2.5 text-sm leading-relaxed text-slate-600">
            <Checkbox.Control className="mt-0.5">
              <Checkbox.Indicator />
            </Checkbox.Control>
            Laporkan informasi yang kurang tepat agar dapat kami tinjau.
          </Checkbox.Content>
        </Checkbox>

        <Button type="submit" variant="primary" className="btn-cta w-full sm:w-fit sm:self-end" isDisabled={!canSubmit}>
          Kirim masukan
          <Send size={14} aria-hidden="true" />
        </Button>
      </Form>
    </Card>
  )
}

export default FeedbackForm
