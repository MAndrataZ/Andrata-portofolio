import './Chip.css'

function Chip({ children, active = false, onClick, ...rest }) {
  const cls = `chip${active ? ' chip--active' : ''}`

  if (onClick) {
    return (
      <button type="button" className={`${cls} chip--button`} aria-pressed={active} onClick={onClick} {...rest}>
        {children}
      </button>
    )
  }

  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  )
}

export default Chip