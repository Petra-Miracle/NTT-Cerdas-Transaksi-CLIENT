import { startAmbient, stopAmbient } from '../utils/ambientSound'
import { useSoundLoop } from './useSoundLoop'

// Musik latar ceria pelan (default 40%). Mulai saat halaman dibuka, berhenti
// saat unmount. Lihat useSoundLoop untuk detail gestur autoplay.
export function useAmbientSound(volume = 0.4) {
  return useSoundLoop(startAmbient, stopAmbient, volume)
}
