import { Check } from 'lucide-react'

function OptionCard({ type = 'radio', name, value, checked, onChange, children, disabled, tone = 'dark' }) {
  const isLight = tone === 'light'

  return (
    <label className={isLight ? 'option-card-light' : 'option-card'} data-selected={checked}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={
          isLight
            ? 'option-indicator-light peer-focus-visible:ring-2 peer-focus-visible:ring-[#E8590C] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white'
            : 'option-indicator peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-ochre)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0d0f1a]'
        }
        data-shape={type === 'checkbox' ? 'square' : 'circle'}
        data-checked={checked}
        aria-hidden="true"
      >
        {checked &&
          (type === 'checkbox' ? (
            <Check size={13} strokeWidth={3} className={isLight ? 'text-[#E8590C]' : 'text-[var(--color-indigo)]'} />
          ) : (
            <span className={isLight ? 'option-dot-light' : 'option-dot'} />
          ))}
      </span>
      <span>{children}</span>
    </label>
  )
}

export default OptionCard
