import { RouterProvider } from '@heroui/react'
import { Route, Routes, useHref, useNavigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import Topbar from './components/Topbar'
import { usePageTransition } from './hooks/usePageTransition'
import Beranda from './pages/Beranda'
import Kalkulator from './pages/Kalkulator'
import Keamanan from './pages/Keamanan'
import Kuis from './pages/Kuis'
import NotFound from './pages/NotFound'
import ProdukLokal from './pages/ProdukLokal'

function App() {
  const { isLoading, displayedLocation } = usePageTransition()
  const navigate = useNavigate()
  // Kuis punya halaman sendiri (/kuis) seperti modul lain — tombol topbar
  // dan kartu beranda mengarah ke sana, tidak lagi menumpuk sebagai modal.
  const openKuis = () => navigate('/kuis')
  /* Semua halaman sekarang pakai tema terang (termasuk 404) — daftar ini
     disiapkan untuk kemungkinan ada halaman gelap lagi nanti. */
  const DARK_PATHS = []
  const isLight = !DARK_PATHS.includes(displayedLocation?.pathname ?? '/')

  return (
    // RouterProvider: tautan HeroUI/React Aria (Breadcrumbs, Link, Tabs ber-href)
    // ikut navigasi client-side react-router, bukan reload halaman penuh.
    <RouterProvider navigate={navigate} useHref={useHref}>
      <ErrorBoundary>
        <a href="#konten-utama" className="skip-link">
          Langsung ke konten utama
        </a>
        <div className={isLight ? 'min-h-screen bg-white' : 'textured-bg min-h-screen'}>
          <Topbar onOpenKuis={openKuis} transparentAtTop={displayedLocation?.pathname === '/'} />
          <div id="konten-utama">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <Routes location={displayedLocation}>
                <Route path="/" element={<Beranda onOpenKuis={openKuis} />} />
                <Route path="/kalkulator" element={<Kalkulator />} />
                <Route path="/keamanan" element={<Keamanan />} />
                <Route path="/kuis" element={<Kuis />} />
                <Route path="/produk-lokal" element={<ProdukLokal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </RouterProvider>
  )
}

export default App
