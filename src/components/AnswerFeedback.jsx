import { Alert, Button, Disclosure } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import KoraNote from './KoraNote'

// Panel umpan balik setelah menjawab — dipakai Keamanan, Kuis, dan Produk
// Lokal. HeroUI Alert (status sukses/bahaya) untuk vonis + penjelasan,
// reaksi KoRa, Disclosure opsional "Kenapa?" untuk detail, lalu tombol
// lanjut berwarna modul (--accent).
function AnswerFeedback({ benar, title, text, koraMessage, detail, nextLabel, onNext }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fade-scale-in flex flex-col gap-3 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_18%,white)] bg-[color-mix(in_oklab,var(--accent)_5%,white)] p-3 sm:p-5">
      <Alert status={benar ? 'success' : 'danger'} className="items-start">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title className="text-base font-bold">{title}</Alert.Title>
          <Alert.Description className="text-sm leading-relaxed text-slate-700">{text}</Alert.Description>
        </Alert.Content>
      </Alert>

      <KoraNote tone="light" outcome={benar ? 'correct' : 'incorrect'}>
        {koraMessage}
      </KoraNote>

      {detail && (
        <Disclosure isExpanded={expanded} onExpandedChange={setExpanded}>
          <Disclosure.Heading>
            <Disclosure.Trigger className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-bold text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]">
              {expanded ? 'Sembunyikan detail' : 'Kenapa?'}
              <Disclosure.Indicator />
            </Disclosure.Trigger>
          </Disclosure.Heading>
          <Disclosure.Content>
            {/* Isi baru dirender saat terbuka supaya tidak terbaca pembaca layar sebelum diminta. */}
            {expanded && (
              <Disclosure.Body className="pt-1 text-sm leading-relaxed text-slate-600">{detail}</Disclosure.Body>
            )}
          </Disclosure.Content>
        </Disclosure>
      )}

      <Button
        variant="primary"
        fullWidth
        className="btn-cta shadow-lg shadow-[color-mix(in_oklab,var(--accent)_30%,transparent)] sm:w-fit sm:self-end"
        onPress={onNext}
      >
        {nextLabel}
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </div>
  )
}

export default AnswerFeedback
