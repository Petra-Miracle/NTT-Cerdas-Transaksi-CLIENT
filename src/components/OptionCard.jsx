function OptionCard({ type = 'radio', name, value, checked, onChange, children, disabled }) {
  return (
    <label className="option-card" data-selected={checked}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-indigo-glow)]"
      />
      <span>{children}</span>
    </label>
  )
}

export default OptionCard
