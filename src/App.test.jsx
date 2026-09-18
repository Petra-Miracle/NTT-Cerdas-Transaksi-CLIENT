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
    expect(screen.queryByRole('heading', { name: /Kuasai Transaksi Digital/ })).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(screen.queryByText('Memuat halaman…')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Kuasai Transaksi Digital/ })).toBeInTheDocument()
  })

  it('menahan konten halaman baru sampai loading selesai saat pindah rute', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderApp()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    await user.click(screen.getByRole('link', { name: /Hitung sekarang/ }))

    expect(screen.getByText('Memuat halaman…')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Kalkulator QRIS' })).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(screen.queryByText('Memuat halaman…')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Kalkulator QRIS' })).toBeInTheDocument()
  })
})
