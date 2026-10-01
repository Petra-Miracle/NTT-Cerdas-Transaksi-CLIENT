import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { playKoraSound } from '../utils/koraSound'
import KoraNote from './KoraNote'

vi.mock('../utils/koraSound', () => ({
  playKoraSound: vi.fn(),
}))

describe('KoraNote', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('memainkan efek suara sesuai outcome, dan diam untuk catatan netral', () => {
    const { rerender } = render(<KoraNote outcome="correct">Benar.</KoraNote>)
    expect(playKoraSound).toHaveBeenCalledWith('correct')

    rerender(<KoraNote outcome="incorrect">Salah.</KoraNote>)
    expect(playKoraSound).toHaveBeenCalledWith('incorrect')

    vi.clearAllMocks()
    rerender(<KoraNote>Netral.</KoraNote>)
    expect(playKoraSound).not.toHaveBeenCalled()
  })

  it('memakai token warna khusus KoRa agar palet mudah diganti', () => {
    const { rerender } = render(<KoraNote outcome="correct">Benar.</KoraNote>)
    expect(screen.getByRole('status')).toHaveClass('kora-review-correct')

    rerender(<KoraNote outcome="incorrect">Salah.</KoraNote>)
    expect(screen.getByRole('status')).toHaveClass('kora-review-incorrect')
  })

  it('menampilkan ulasan berhasil dengan status dan pesan KoRa', () => {
    render(<KoraNote outcome="correct">Hebat, jawabanmu tepat.</KoraNote>)

    expect(screen.getByRole('status')).toHaveAttribute('data-outcome', 'correct')
    expect(screen.getByText('Jawaban tepat!')).toBeInTheDocument()
    expect(screen.getByText('Hebat, jawabanmu tepat.')).toBeInTheDocument()
    expect(screen.getByAltText('Maskot KoRa')).toHaveClass('kora-bounce-correct')
  })

  it('menampilkan ulasan perbaikan tanpa menyebut jawaban sebagai kegagalan', () => {
    render(<KoraNote outcome="incorrect">Coba cek kembali.</KoraNote>)

    expect(screen.getByRole('status')).toHaveAttribute('data-outcome', 'incorrect')
    expect(screen.getByText('Yuk, pelajari lagi!')).toBeInTheDocument()
    expect(screen.getByText('Coba cek kembali.')).toBeInTheDocument()
    expect(screen.getByAltText('Maskot KoRa')).toHaveClass('kora-shake-incorrect')
  })

  it('mempertahankan tampilan netral untuk catatan KoRa tanpa outcome', () => {
    render(<KoraNote>Pesan penutup.</KoraNote>)

    expect(screen.getByText('Pesan penutup.')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute('data-outcome', 'neutral')
    expect(screen.getByAltText('Maskot KoRa')).toHaveClass('mascot-float')
  })

  it('memakai tone terang yang terbaca di atas latar putih', () => {
    const { rerender } = render(<KoraNote tone="light">Pesan penutup.</KoraNote>)

    expect(screen.getByRole('status')).toHaveClass('kora-tone-light')
    expect(screen.getByRole('status')).toHaveClass('bg-orange-50')

    rerender(
      <KoraNote tone="light" outcome="correct">
        Benar.
      </KoraNote>,
    )
    expect(screen.getByRole('status')).toHaveClass('kora-tone-light')
    expect(screen.getByRole('status')).toHaveClass('kora-review-correct')
  })
})
