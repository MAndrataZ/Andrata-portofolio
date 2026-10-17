import useReveal from '../../hooks/useReveal.js'
import './Reveal.css'

function Reveal({ as: Tag = 'div', className = '', children }) {
  const [ref, visible] = useReveal()

  return (
    <Tag ref={ref} className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export default Reveal