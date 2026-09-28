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

    expect(screen.getByRole('link', { name: /Hitung sekarang/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Keamanan QRIS/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Kuis CBP Rupiah/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Lokal atau Bukan/ })).toBeInTheDocument()
  })
})
