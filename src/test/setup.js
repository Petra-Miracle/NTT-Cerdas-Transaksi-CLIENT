import '@testing-library/jest-dom/vitest'

// jsdom belum punya ResizeObserver; komponen HeroUI (ScrollShadow di Tabs,
// carousel video) memakainya untuk mendeteksi overflow. Stub no-op cukup
// untuk test — perilaku visualnya diuji manual di browser.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
