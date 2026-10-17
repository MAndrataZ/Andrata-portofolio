import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Chip from '../ui/Chip.jsx'
import { formatPeriod } from '../../lib/dates.js'
import './TimelineItem.css'

function TimelineItem({ item }) {
  const [open, setOpen] = useState(false)
  const compact = item.type === 'organization'
  const current = !item.end

  const highlights = item.highlights ?? []
  const limit = compact ? 2 : 4
  const shown = !compact && open ? highlights : highlights.slice(0, limit)
  const hiddenCount = highlights.length - limit
  const shipped = (item.shipped ?? []).filter((s) => s.label && s.url)
  const tech = item.tech ?? []

  const period = [formatPeriod(item.start, item.end), item.location].filter(Boolean).join(' · ')

  return (
    <li className={`tl${compact ? ' tl--compact' : ''}${current ? ' tl--current' : ''}`}>
      <p className="label">{period}</p>
      <h3 className="tl__role">{item.role}</h3>
      <p className="tl__org">{item.org}</p>
      {item.summary && <p className="tl__summary">{item.summary}</p>}

      {shown.length > 0 && (
        <ul className="tl__highlights">
          {shown.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {!compact && hiddenCount > 0 && (
        <button type="button" className="tl__more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'Show less' : `Show ${hiddenCount} more`}
        </button>
      )}

      {shipped.length > 0 && (
        <ul className="tl__chips">
          {shipped.map((s) => (
            <li key={s.url + s.label}>
              <a className="chip tl__ship" href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label} <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <ul className="tl__chips">
          {tech.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default TimelineItem