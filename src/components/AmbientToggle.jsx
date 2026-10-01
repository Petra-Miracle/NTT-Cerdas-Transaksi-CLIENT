import { ToggleButton, Tooltip } from '@heroui/react'
import { Volume2, VolumeX } from 'lucide-react'

// Tombol musik latar — HeroUI ToggleButton (aria-pressed) + Tooltip, menempel
// di pojok kanan bawah dengan jarak aman untuk perangkat ber-notch.
function AmbientToggle({ on, onToggle }) {
  const label = on ? 'Matikan musik latar' : 'Nyalakan musik latar'

  return (
    <Tooltip delay={400}>
      <ToggleButton
        isSelected={on}
        onChange={onToggle}
        isIconOnly
        aria-label={label}
        className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 size-12 rounded-full bg-[#15335F] text-white shadow-xl ring-1 ring-white/25 hover:scale-105 hover:bg-[#0e2547] data-[selected=true]:bg-[#15335F] data-[selected=true]:text-white"
      >
        {on ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
      </ToggleButton>
      <Tooltip.Content placement="left" showArrow className="text-xs font-semibold">
        <Tooltip.Arrow />
        {label}
      </Tooltip.Content>
    </Tooltip>
  )
}

export default AmbientToggle
