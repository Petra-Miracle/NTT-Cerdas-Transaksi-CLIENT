import { createPortal } from 'react-dom'
import maskotKora from '../assets/img/BonekaKoRa-removebg.png'

function LoadingScreen({ size = 140, message = '', imageFront = maskotKora, imageBack = maskotKora }) {
  const coinStyle = { width: size, height: size, perspective: 1200 }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      role="status"
      aria-live="polite"
    >
      <div className="fade-scale-in flex flex-col items-center gap-6">
        <div className="relative" style={coinStyle} aria-hidden="true">
          <div className="coin-flip relative h-full w-full">
            <div className="coin-face">
              <img src={imageFront} alt="" className="h-full w-full object-contain p-4" />
            </div>
            <div className="coin-face coin-face-back">
              <img src={imageBack} alt="" className="h-full w-full object-contain p-4" />
            </div>
          </div>
          <div className="coin-ring" />
        </div>

        {message && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-lg font-medium text-white">{message}</p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {!message && <span className="sr-only">Memuat halaman…</span>}
      </div>
    </div>,
    document.body,
  )
}

export default LoadingScreen
