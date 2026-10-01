import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Beranda from './Beranda'

function renderBeranda() {
  return render(
    <MemoryRouter>
      <Beranda />
    </MemoryRouter>,
  )
}

describe('Beranda product tour', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('menampilkan tur produk pada kunjungan pertama', () => {
    renderBeranda()
    expect(screen.getByText('Selamat datang di NTT Cerdas Transaksi')).toBeInTheDocument()
  })

  it('menyembunyikan tur dan menyimpan status setelah tombol Lewati diklik', async () => {
    const user = userEvent.setup()
    renderBeranda()

    await user.click(screen.getByRole('button', { name: 'Lewati' }))

    expect(screen.queryByText('Selamat datang di NTT Cerdas Transaksi')).not.toBeInTheDocument()
    expect(window.localStorage.getItem('ntt_tour_seen_beranda')).toBe('true')
  })

  it('tidak menampilkan tur lagi kalau sudah pernah dilihat', () => {
    window.localStorage.setItem('ntt_tour_seen_beranda', 'true')
    renderBeranda()
    expect(screen.queryByText('Selamat datang di NTT Cerdas Transaksi')).not.toBeInTheDocument()
  })

  it('bisa melihat panduan lagi lewat tombol "Lihat panduan lagi" setelah tur pernah dilewati', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('ntt_tour_seen_beranda', 'true')
    renderBeranda()

    await user.click(screen.getByRole('button', { name: /Lihat panduan lagi/ }))
    expect(screen.getByText('Selamat datang di NTT Cerdas Transaksi')).toBeInTheDocument()
  })

  it('menampilkan keempat kartu modul', () => {
    window.localStorage.setItem('ntt_tour_seen_beranda', 'true')
    renderBeranda()

    expect(screen.getByRole('link', { name: /Hitung Sekarang/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Coba Skenario/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Mulai Kuis/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mulai Tebak/i })).toBeInTheDocument()
  })

  it('membuka animasi peluncuran KoRa saat kartu modul diklik', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('ntt_tour_seen_beranda', 'true')
    renderBeranda()

    await user.click(screen.getByRole('link', { name: /Hitung Sekarang/i }))

    expect(screen.getByRole('dialog', { name: /Siap main Kalkulator QRIS/ })).toBeInTheDocument()
    expect(screen.getByText(/KoRa sedang menyiapkan permainan/)).toBeInTheDocument()
  })

  it('menampilkan galeri video edukasi YouTube dalam tab kategori', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('ntt_tour_seen_beranda', 'true')
    renderBeranda()

    expect(screen.getByRole('heading', { name: 'Belajar lewat video' })).toBeInTheDocument()

    const tabHemat = screen.getByRole('tab', { name: /Hemat ala QRIS/ })
    const tabWaspada = screen.getByRole('tab', { name: /Waspada QR Palsu/ })
    expect(tabHemat).toHaveAttribute('aria-selected', 'true')

    // Tab default: sorotan + 9 kartu = 10 tautan video hemat.
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    const kokBisa = screen.getByRole('link', { name: /Gimana Sebenarnya Cara Kerja QRIS/ })
    expect(kokBisa).toHaveAttribute('href', 'https://www.youtube.com/watch?v=YMcI754wroM')
    expect(kokBisa).toHaveAttribute('target', '_blank')

    // Pindah tab menampilkan video kategori lain.
    await user.click(tabWaspada)
    expect(tabWaspada).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('link', { name: /Akibat QRIS Palsu, Pedagang Pujasera Rugi Jutaan Rupiah/ }),
    ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=Z7sR6onuWBU')
    expect(screen.queryByRole('link', { name: /Gimana Sebenarnya Cara Kerja QRIS/ })).not.toBeInTheDocument()
  })
})
