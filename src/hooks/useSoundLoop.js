import { useEffect, useState } from 'react'

// Loop suara generik: mulai saat halaman/bagian aktif, berhenti saat unmount
// atau dimatikan. startFn/stopFn dari modul suara (ambient/action). Browser
// mengharuskan gestur dulu sebelum bunyi, jadi start dipanggil ulang tiap ada
// interaksi sampai konteks audio benar-benar jalan.
export function useSoundLoop(startFn, stopFn, volume = 0.4, { active = true } = {}) {
  const [soundOn, setSoundOn] = useState(true)

  useEffect(() => {
    if (!soundOn || !active) {
      stopFn()
      return undefined
    }
    const kick = () => startFn({ volume })
    kick()
    window.addEventListener('pointerdown', kick)
    window.addEventListener('keydown', kick)
    return () => {
      window.removeEventListener('pointerdown', kick)
      window.removeEventListener('keydown', kick)
      stopFn()
    }
  }, [soundOn, active, volume, startFn, stopFn])

  return [soundOn, setSoundOn]
}
