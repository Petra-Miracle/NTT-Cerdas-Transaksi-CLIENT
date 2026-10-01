import { Disclosure } from '@heroui/react'
import { Check, X } from 'lucide-react'
import { useState } from 'react'

// "Lihat pembahasan tiap soal/kartu" di layar hasil Kuis & Produk Lokal —
// HeroUI Disclosure (tombol ber-aria-expanded + panel beranimasi).
function ReviewDisclosure({ labelOpen, items }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Disclosure isExpanded={expanded} onExpandedChange={setExpanded} className="flex w-full flex-col items-center">
      <Disclosure.Heading>
        <Disclosure.Trigger className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-sm font-bold text-[var(--accent)] hover:underline">
          {expanded ? 'Sembunyikan pembahasan' : labelOpen}
          <Disclosure.Indicator />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content className="w-full">
        {expanded && (
          <Disclosure.Body className="flex w-full flex-col gap-3 pt-2 text-left">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex items-start gap-2.5 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_15%,white)] bg-white p-4"
              >
                {item.benar ? (
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : (
                  <X size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </Disclosure.Body>
        )}
      </Disclosure.Content>
    </Disclosure>
  )
}

export default ReviewDisclosure
