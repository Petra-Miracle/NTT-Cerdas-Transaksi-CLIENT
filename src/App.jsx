import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import Topbar from './components/Topbar'
import { usePageLoading } from './hooks/usePageLoading'
import Beranda from './pages/Beranda'
import Kalkulator from './pages/Kalkulator'
import Keamanan from './pages/Keamanan'
import NotFound from './pages/NotFound'

function App() {
  const isLoading = usePageLoading()

  return (
    <ErrorBoundary>
      <a href="#konten-utama" className="skip-link">
        Langsung ke konten utama
      </a>
      {isLoading && <LoadingScreen />}
      <div className={`textured-bg min-h-screen transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Topbar />
        <div id="konten-utama">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/kalkulator" element={<Kalkulator />} />
            <Route path="/keamanan" element={<Keamanan />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
