import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function Modal({ isOpen, onClose, titleId, panelClassName, backdropClassName, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const dialog = dialogRef.current
    const focusables = dialog?.querySelectorAll(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog) return

      const nodes = dialog.querySelectorAll(FOCUSABLE_SELECTOR)
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClassName ?? 'bg-[#05070C]/60'}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`panel-glow relative max-h-[90vh] w-full max-w-[640px] overflow-y-auto p-6 sm:p-8 ${panelClassName ?? ''}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white/70 text-slate-500 transition hover:bg-rose-100 hover:text-slate-800"
        >
          <X size={15} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
