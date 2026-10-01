import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { calculateResult } from './kalkulatorLogic'
import KalkulatorResult from './KalkulatorResult'

const answers = { omzetHarian: 300000, pengalaman: ['kabur'], waktuMenit: 30, punyaRekening: 'ya' }

describe('KalkulatorResult interaktif', () => {
  it('default Bulanan lalu bisa diganti ke Mingguan dan Harian', async () => {
    const user = userEvent.setup()
    const result = calculateResult(answers) // 15 jam/bulan
    render(<KalkulatorResult answers={answers} result={result} onReset={() => {}} />)

    expect(screen.getByText('15 jam')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Mingguan' }))
    expect(screen.getByText('3,5 jam')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Harian' }))
    expect(screen.getByText('0,5 jam')).toBeInTheDocument()
  })
})
