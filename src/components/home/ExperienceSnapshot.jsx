import { Link } from 'react-router-dom'
import HomeSection from './HomeSection.jsx'
import { experience } from '../../data/experience.js'
import { formatPeriod } from '../../lib/dates.js'
import { sortNewest } from '../../lib/experience.js'
import './ExperienceSnapshot.css'

const recent = sortNewest(experience)
  .sort((a, b) => Number(b.showOnHome ?? false) - Number(a.showOnHome ?? false))
  .slice(0, 2)

function ExperienceSnapshot() {
  if (recent.length === 0) return null

  return (
    <HomeSection
      number="03"
      label="Experience"
      title={
        <>
          Where I’ve <em>worked</em>
        </>
      }
      action={
        <Link to="/experience" className="label">
          Full timeline →
        </Link>
      }
    >
      <ol className="xp-list">
        {recent.map((item) => (
          <li key={item.id} className="xp">
            <p className="label">
              {formatPeriod(item.start, item.end)} · {item.type === 'work' ? 'Work' : 'Organization'}
            </p>
            <h3>{item.role}</h3>
            <p className="xp__org">{item.org}</p>
            {item.summary && <p className="xp__summary">{item.summary}</p>}
          </li>
        ))}
      </ol>
    </HomeSection>
  )
}

export default ExperienceSnapshot