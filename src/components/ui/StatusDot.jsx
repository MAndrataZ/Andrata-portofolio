import './StatusDot.css'

function StatusDot({ tone = 'accent' }) {
  return <span className={`dot dot--${tone}`} aria-hidden="true" />
}

export default StatusDot