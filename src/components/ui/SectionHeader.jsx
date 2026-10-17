import './SectionHeader.css'

function SectionHeader({ number, label, title, action }) {
  return (
    <div className="section-header">
      <div className="section-header__top">
        <span className="label">
          {number} — {label}
        </span>
        {action}
      </div>
      {title && <h2>{title}</h2>}
    </div>
  )
}

export default SectionHeader