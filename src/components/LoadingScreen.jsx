import maskotKora from '../assets/img/BonekaKoRa-removebg.png'

function LoadingScreen() {
  return (
    <div
      className="textured-bg fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
    >
      <img
        src={maskotKora}
        alt=""
        aria-hidden="true"
        className="mascot-float h-32 w-auto object-contain drop-shadow-2xl sm:h-40"
      />
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-ochre)] [animation-delay:300ms]" />
      </div>
      <span className="sr-only">Memuat halaman…</span>
    </div>
  )
}

export default LoadingScreen
