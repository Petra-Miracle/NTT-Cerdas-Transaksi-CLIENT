import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import Topbar from './components/Topbar'
import { usePageTransition } from './hooks/usePageTransition'
import Beranda from './pages/Beranda'
import Kalkulator from './pages/Kalkulator'
import Keamanan from './pages/Keamanan'
import NotFound from './pages/NotFound'

function App() {
  const { isLoading, displayedLocation } = usePageTransition()

  return (
    <ErrorBoundary>
      <a href="#konten-utama" className="skip-link">
        Langsung ke konten utama
      </a>
      <div className="textured-bg min-h-screen">
        <Topbar />
        <div id="konten-utama">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Routes location={displayedLocation}>
              <Route path="/" element={<Beranda />} />
              <Route path="/kalkulator" element={<Kalkulator />} />
              <Route path="/keamanan" element={<Keamanan />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
