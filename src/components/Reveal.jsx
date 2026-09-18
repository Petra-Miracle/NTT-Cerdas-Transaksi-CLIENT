import { useScrollReveal } from '../hooks/useScrollReveal'

function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <Tag ref={ref} className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Reveal
