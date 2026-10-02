import { Button, Drawer, Separator } from '@heroui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Calculator, ShieldCheck, BookOpenCheck, ShoppingBag, Play } from 'lucide-react'
import vertexId from '../assets/img/VertexID.png'

// Compound Navbar Component implementing the user's requested API structure
export function Navbar({ children, className = '', transparent = false, ...props }) {
  const surfaceClassName = transparent
    ? 'bg-transparent'
    : 'border-b border-slate-200/80 bg-white/90 backdrop-blur-md'

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 ${surfaceClassName} ${className}`} {...props}>
      <div className="mx-auto max-w-[1280px]">
        {children}
      </div>
    </header>
  )
}

Navbar.Header = function NavbarHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 sm:px-6 ${className}`}>
      {children}
    </div>
  )
}

Navbar.Brand = function NavbarBrand({ children }) {
  return (
    <Link to="/" className="flex min-h-[44px] items-center gap-2.5 transition hover:opacity-90" data-tour="menu-brand">
      {children || (
        <>
          <img src={vertexId} alt="" aria-hidden="true" className="size-9 shrink-0 object-contain" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-extrabold tracking-tight text-[#15335F]">
              NTT Cerdas Transaksi
            </span>
            <span className="hidden truncate text-[11px] font-semibold text-slate-500 sm:block">
              Bank Indonesia Kupang • Edukasi QRIS & Rupiah
            </span>
          </span>
        </>
      )}
    </Link>
  )
}

Navbar.MenuToggle = function NavbarMenuToggle({ isOpen, onClick }) {
  return (
    <Button
      variant="tertiary"
      isIconOnly
      onPress={onClick}
      className="size-11 shrink-0 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 lg:hidden"
      aria-label={isOpen ? 'Tutup menu modul' : 'Buka menu modul'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
    </Button>
  )
}

// Menu mobile: HeroUI Drawer dari sisi kanan layar,
// menutup konten dengan backdrop (bukan mendorongnya), bisa ditutup dengan
// swipe/Escape/tap di luar, dan fokus terkunci di dalam selama terbuka.
Navbar.Menu = function NavbarMenu({ isOpen, onOpenChange, children }) {
  return (
    <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} className="lg:hidden">
      <Drawer.Content placement="right">
        <Drawer.Dialog className="flex h-dvh w-[min(85vw,22rem)] max-w-[85vw] flex-col overflow-y-auto rounded-l-[28px] px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Drawer.CloseTrigger aria-label="Tutup menu" className="size-11" />
          <Drawer.Header className="px-2 pt-2 pb-1">
            <Drawer.Heading className="font-display text-lg font-black text-[#15335F]">Pilih modul belajar</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto px-0">{children}</Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

Navbar.MenuItem = function NavbarMenuItem({ to, onClick, children, className = '' }) {
  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex min-h-[48px] items-center rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#15335F] active:bg-slate-100 ${className}`}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[48px] w-full items-center rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#15335F] active:bg-slate-100 ${className}`}
    >
      {children}
    </button>
  )
}

Navbar.Content = function NavbarContent({ children, className = '' }) {
  return (
    <div className={`hidden items-center gap-3 lg:flex ${className}`}>
      {children}
    </div>
  )
}

Navbar.Item = function NavbarItem({ to, onClick, children, className = '', active = false }) {
  const base = "inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold transition shadow-sm hover:-translate-y-0.5 active:translate-y-0"
  // Modul yang sedang dibuka diberi cincin kuning + aria-current.
  const activeCls = active ? "ring-2 ring-[#FFD02F] ring-offset-2" : ""

  if (to) {
    return (
      <Link to={to} aria-current={active ? 'page' : undefined} className={`${base} ${activeCls} ${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-current={active ? 'page' : undefined} className={`${base} ${activeCls} ${className}`}>
      {children}
    </button>
  )
}

Navbar.Label = function NavbarLabel({ children, className = '' }) {
  return (
    <span className={`text-xs font-semibold text-slate-500 ${className}`}>
      {children}
    </span>
  )
}

Navbar.Separator = function NavbarSeparator() {
  return <Separator orientation="vertical" className="h-6 bg-slate-200" />
}

Navbar.Spacer = function NavbarSpacer() {
  return <div className="flex-1" />
}

// Main Topbar component using the HeroUI-style Navbar structure requested
export default function Topbar({ onOpenKuis, transparentAtTop = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isTransparent = transparentAtTop && !isScrolled

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const handleKuisClick = () => {
    setMenuOpen(false)
    if (onOpenKuis) onOpenKuis()
    else navigate('/kuis')
  }

  return (
    <Navbar transparent={isTransparent}>
      <Navbar.Header>
        <Navbar.Brand />
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/kalkulator"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#FFD02F] px-3.5 text-sm font-black text-[#15335F] shadow transition hover:brightness-105 active:scale-[0.97]"
            data-tour="menu-cta"
          >
            <Play size={14} fill="currentColor" aria-hidden="true" />
            Main
          </Link>
          <Navbar.MenuToggle isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        {/* Desktop Content */}
        <Navbar.Content>
          <Navbar.Item to="/kalkulator" active={pathname === '/kalkulator'} className="!bg-[#E8590C] !text-white hover:!bg-[#C94F08]">
            <Calculator size={15} /> Kalkulator
          </Navbar.Item>
          <Navbar.Item to="/keamanan" active={pathname === '/keamanan'} className="!bg-[#7C5CFF] !text-white hover:!bg-[#6B46F5]">
            <ShieldCheck size={15} /> Keamanan
          </Navbar.Item>
          <Navbar.Item onClick={handleKuisClick} active={pathname === '/kuis'} className="!bg-[#E5484D] !text-white hover:!bg-[#D93338]">
            <BookOpenCheck size={15} /> Kuis CBP
          </Navbar.Item>
          <Navbar.Item to="/produk-lokal" active={pathname === '/produk-lokal'} className="!bg-[#1A5DAD] !text-white hover:!bg-[#154B8A]">
            <ShoppingBag size={15} /> Produk Lokal
          </Navbar.Item>
          <Navbar.Spacer />
          <Navbar.Separator />
          <Link
            to="/kalkulator"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[#FFD02F] px-4 py-3 text-sm font-black text-[#15335F] shadow transition hover:brightness-105"
            data-tour="menu-cta"
          >
            Main Sekarang
          </Link>
        </Navbar.Content>
      </Navbar.Header>

      {/* Mobile Menu */}
      <Navbar.Menu isOpen={menuOpen} onOpenChange={setMenuOpen}>
        <Navbar.MenuItem to="/kalkulator" onClick={() => setMenuOpen(false)}>
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <Calculator size={16} />
          </span>
          Kalkulator QRIS
        </Navbar.MenuItem>
        <Navbar.MenuItem to="/keamanan" onClick={() => setMenuOpen(false)}>
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <ShieldCheck size={16} />
          </span>
          Keamanan QRIS
        </Navbar.MenuItem>
        <Navbar.MenuItem onClick={handleKuisClick}>
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
            <BookOpenCheck size={16} />
          </span>
          Kuis CBP Rupiah
        </Navbar.MenuItem>
        <Navbar.MenuItem to="/produk-lokal" onClick={() => setMenuOpen(false)}>
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <ShoppingBag size={16} />
          </span>
          Lokal atau Impor?
        </Navbar.MenuItem>
        <div className="mt-auto shrink-0 border-t border-slate-100 pt-3">
          <Link
            to="/kalkulator"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#15335F] px-4 py-3 text-sm font-bold text-white shadow transition hover:bg-[#0e2547] active:bg-[#0a1a33]"
          >
            Main Sekarang ⚡
          </Link>
        </div>
      </Navbar.Menu>
    </Navbar>
  )
}
