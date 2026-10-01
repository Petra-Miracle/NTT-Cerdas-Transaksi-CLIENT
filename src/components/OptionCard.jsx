import { Checkbox, Radio } from '@heroui/react'

// Kartu opsi besar berbasis HeroUI Radio / Checkbox (React Aria): semantik
// radio/checkbox asli, navigasi keyboard, dan state hover/pressed/focus
// datang dari HeroUI — tampilan kartunya disesuaikan dengan tema modul lewat
// --accent (lihat .accent-* di index.css). Dipakai di dalam
// <RadioGroup> / <CheckboxGroup> milik HeroUI.
const CARD =
  'option-card-light group w-full data-[selected=true]:border-[var(--accent)] data-[selected=true]:bg-[var(--accent-soft)] data-[selected=true]:shadow-[0_10px_22px_-10px_color-mix(in_oklab,var(--accent)_45%,transparent)] data-[hovered=true]:border-[color-mix(in_oklab,var(--accent)_45%,white)] data-[focus-visible=true]:outline-3 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-[var(--focus)]'

const CONTROL = 'size-5 border-2 border-[color-mix(in_oklab,var(--accent)_40%,white)] bg-white shadow-none'

export function RadioOption({ value, children, className = '' }) {
  return (
    <Radio value={value} className="w-full">
      <Radio.Content className={`${CARD} ${className}`}>
        <Radio.Control className={CONTROL}>
          <Radio.Indicator />
        </Radio.Control>
        <span className="min-w-0 flex-1">{children}</span>
      </Radio.Content>
    </Radio>
  )
}

export function CheckboxOption({ value, children, className = '' }) {
  return (
    <Checkbox value={value} className="w-full">
      <Checkbox.Content className={`${CARD} ${className}`}>
        <Checkbox.Control className={`${CONTROL} rounded-md`}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <span className="min-w-0 flex-1">{children}</span>
      </Checkbox.Content>
    </Checkbox>
  )
}
