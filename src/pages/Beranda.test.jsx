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

describe('Beranda onboarding', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('menampilkan tooltip onboarding pada kunjungan pertama', () => {
    renderBeranda()
    expect(screen.getByText('Mulai di sini ↑')).toBeInTheDocument()
  })

  it('menyembunyikan tooltip dan menyimpan status setelah kartu Kalkulator diklik', async () => {
    const user = userEvent.setup()
    renderBeranda()

    await user.click(screen.getByRole('link', { name: /Kalkulator QRIS/ }))

    expect(screen.queryByText('Mulai di sini ↑')).not.toBeInTheDocument()
    expect(window.localStorage.getItem('ntt_onboarding_seen')).toBe('true')
  })

  it('tidak menampilkan tooltip lagi kalau sudah pernah dilihat', () => {
    window.localStorage.setItem('ntt_onboarding_seen', 'true')
    renderBeranda()
    expect(screen.queryByText('Mulai di sini ↑')).not.toBeInTheDocument()
  })

  it('kartu Keamanan QRIS dan Kuis CBP tidak pernah mendapat onboarding', () => {
    renderBeranda()
    const keamananCard = screen.getByRole('link', { name: /Keamanan QRIS/ })
    const kuisCard = screen.getByRole('button', { name: /Kuis CBP Rupiah/ })
    const tooltip = screen.getByText('Mulai di sini ↑')
    expect(keamananCard.contains(tooltip)).toBe(false)
    expect(kuisCard.contains(tooltip)).toBe(false)
  })
})
