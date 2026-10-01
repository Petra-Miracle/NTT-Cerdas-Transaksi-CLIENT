import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )
}

describe('App page transitions', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('menampilkan loading screen dulu sebelum konten halaman pertama muncul', async () => {
    renderApp()

    expect(screen.getByText('Memuat halaman…')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Belajar QRIS/ })).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(screen.queryByText('Memuat halaman…')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Belajar QRIS/ })).toBeInTheDocument()
  })

  it('menahan konten halaman baru sampai loading selesai saat pindah rute', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderApp()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    // Klik modul membuka animasi peluncuran KoRa dulu, bukan langsung pindah.
    await user.click(screen.getByRole('link', { name: /Hitung Sekarang/i }))
    expect(screen.getByRole('dialog', { name: /Siap main Kalkulator QRIS/ })).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1400)
    })

    // Tekan Play memicu ledakan kabut lalu navigasi.
    await user.click(screen.getByRole('button', { name: /Mulai main Kalkulator QRIS/ }))

    await act(async () => {
      await vi.advanceTimersByTimeAsync(700)
    })

    expect(screen.getByText('Memuat halaman…')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Kalkulator QRIS' })).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(screen.queryByText('Memuat halaman…')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Kalkulator QRIS' })).toBeInTheDocument()
  })

  it('membuka halaman kuis sendiri dari tombol topbar', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderApp()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    await user.click(screen.getByRole('button', { name: 'Kuis CBP' }))

    expect(screen.getByText('Memuat halaman…')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Kuis CBP Rupiah' })).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(screen.queryByText('Memuat halaman…')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Kuis CBP Rupiah' })).toBeInTheDocument()
    expect(screen.getByText('Soal 1 dari 10')).toBeInTheDocument()
  })
})
