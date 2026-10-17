import { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeSection from './HomeSection.jsx'
import Chip from '../ui/Chip.jsx'
import { skillGroups } from '../../data/skills.js'
import { projects } from '../../data/projects.js'
import ProjectRef from '../projects/ProjectRef.jsx'
import './SkillsSnapshot.css'


function SkillsSnapshot() {
  const [active, setActive] = useState(null)
  const evidence = active ? projects.filter((p) => active.projects?.includes(p.slug)) : []

  return (
    <HomeSection
      number="02"
      label="What I work with"
      title={
        <>
          What I work <em>with</em>
        </>
      }
      action={
        <Link to="/about" className="label">
          Full list →
        </Link>
      }
    >
      <div className="skills">
        {skillGroups.map((group) => (
          <div key={group.name}>
            <h3 className="skills__title">{group.name}</h3>
            <ul className="skills__items">
              {group.items.slice(0, 6).map((item) => (
                <li key={item.name}>
                  <Chip
                    active={active?.name === item.name}
                    onClick={() => setActive(item)}
                    onMouseEnter={() => setActive(item)}
                    onFocus={() => setActive(item)}
                  >
                    {item.name}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="skills__evidence" aria-live="polite">
        {!active && <span className="label">Hover or focus a skill to see where I used it.</span>}
        {active && (
          <>
            <span className="label">{active.name} · used in</span>
            {evidence.length > 0 ? (
              evidence.map((p) => <ProjectRef key={p.slug} project={p} />)
            ) : (
              <span className="skills__none">No linked project yet.</span>
            )}
          </>
        )}
      </div>
    </HomeSection>
  )
}

export default SkillsSnapshot