import { useState } from 'react'
import { Link } from 'react-router-dom'
import KalkulatorResult from '../modules/kalkulator/KalkulatorResult'
import KalkulatorWizard from '../modules/kalkulator/KalkulatorWizard'
import { calculateResult } from '../modules/kalkulator/kalkulatorLogic'
import { submitKalkulatorResult } from '../services/api'

function Kalkulator() {
  const [state, setState] = useState(null) // { answers, result }

  const handleComplete = (answers) => {
    const result = calculateResult(answers)
    setState({ answers, result })

    submitKalkulatorResult({
      omzetHarian: answers.omzetHarian,
      pengalaman: answers.pengalaman,
      waktuMenit: answers.waktuMenit,
      punyaRekening: answers.punyaRekening === 'ya',
      uangTunaiPerBulan: result.uangTunaiPerBulan,
      jamPerBulan: result.jamPerBulan,
      nilaiWaktuBulanan: result.nilaiWaktuBulanan,
    })
  }

  return (
    <main className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-6 pb-16">
      <Link to="/" className="back-link w-fit">
        ← Kembali ke beranda
      </Link>

      <div className="mx-auto max-w-[760px] text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Kalkulator QRIS</h1>
        <p className="page-intro mt-2 text-[var(--color-ink-on-bg-muted)]">
          Jawab 4 pertanyaan singkat untuk melihat berapa banyak waktu dan potensi masalah uang tunai yang
          bisa kamu hindari dengan QRIS.
        </p>
      </div>

      {state ? (
        <KalkulatorResult answers={state.answers} result={state.result} onReset={() => setState(null)} />
      ) : (
        <KalkulatorWizard onComplete={handleComplete} />
      )}
    </main>
  )
}

export default Kalkulator
