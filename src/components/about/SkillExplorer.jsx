import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Award, Briefcase, Folder, X } from 'lucide-react'
import Chip from '../ui/Chip.jsx'
import { skillGroups } from '../../data/skills.js'
import { getEvidenceGroups } from '../../lib/skills.js'
import './SkillExplorer.css'

const types = [
  { key: 'projects', label: 'Projects', icon: Folder },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'certs', label: 'Certificates', icon: Award },
]

function Row({ row, icon: Icon }) {
  const Go = row.href ? ArrowUpRight : ArrowRight

  const inner = (
    <>
      <Icon className="evidence__icon" size={16} strokeWidth={1.5} aria-hidden="true" />
      <span className="evidence__text">
        <span className="evidence__title">{row.title}</span>
        {row.meta && <span className="evidence__meta">{row.meta}</span>}
      </span>
      {(row.to || row.href) && <Go className="evidence__go" size={16} strokeWidth={1.5} aria-hidden="true" />}
    </>
  )

  if (row.to) {
    return (
      <Link to={row.to} className="evidence__row">
        {inner}
      </Link>
    )
  }
  if (row.href) {
    return (
      <a href={row.href} target="_blank" rel="noopener noreferrer" className="evidence__row">
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return <div className="evidence__row">{inner}</div>
}

function EvidencePanel({ skill, evidence, onClear }) {
  if (!skill) {
    return (
      <div className="evidence evidence--empty">
        <p className="label">Evidence</p>
        <p className="evidence__hint">Select a skill to see the projects, roles, and certificates behind it.</p>
        <ul className="evidence__legend">
          {types.map(({ key, label, icon: Icon }) => (
            <li key={key}>
              <Icon size={16} strokeWidth={1.5} aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="evidence">
      <div className="evidence__head">
        <div>
          <p className="label">Evidence</p>
          <p className="evidence__name">{skill.name}</p>
        </div>
        <button type="button" className="evidence__close" onClick={onClear} aria-label="Clear selection">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {evidence.total === 0 && <p className="evidence__none">No linked example yet.</p>}

      {types.map(
        ({ key, label, icon }) =>
          evidence[key].length > 0 && (
            <div key={key} className="evidence__group">
              <p className="label evidence__group-title">{label}</p>
              <ul className="evidence__list">
                {evidence[key].map((row) => (
                  <li key={row.key}>
                    <Row row={row} icon={icon} />
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  )
}

function SkillExplorer() {
  const [selected, setSelected] = useState(null)
  const inlineRef = useRef(null)

  const active = selected ? skillGroups.flatMap((g) => g.items).find((i) => i.name === selected) : null
  const evidence = active ? getEvidenceGroups(active) : null

  // on small screens the panel opens under the chosen group; bring it into view
  useEffect(() => {
    if (!selected || !window.matchMedia('(max-width: 959px)').matches) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    inlineRef.current?.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' })
  }, [selected])

  const toggle = (name) => setSelected((current) => (current === name ? null : name))
  const clear = () => setSelected(null)

  const panel = <EvidencePanel skill={active} evidence={evidence} onClear={clear} />

  return (
    <div className="explorer">
      <div className="explorer__groups">
        {skillGroups.map((group) => (
          <section key={group.name} className="explorer__group" aria-label={group.name}>
            <h3 className="explorer__title">
              {group.name} <span className="label">{group.items.length}</span>
            </h3>
            <ul className="explorer__chips">
              {group.items.map((item) => {
                const count = getEvidenceGroups(item).total
                return (
                  <li key={item.name}>
                    <Chip active={selected === item.name} onClick={() => toggle(item.name)}>
                      {item.name}
                      {count > 0 && (
                        <>
                          <span className="explorer__count" aria-hidden="true">
                            {count}
                          </span>
                          <span className="sr-only">, {count} linked</span>
                        </>
                      )}
                    </Chip>
                  </li>
                )
              })}
            </ul>
            {group.items.some((i) => i.name === selected) && (
              <div ref={inlineRef} className="explorer__inline">
                {panel}
              </div>
            )}
          </section>
        ))}
      </div>

      <aside className="explorer__aside" aria-label="Skill evidence" aria-live="polite">
        {panel}
      </aside>
    </div>
  )
}

export default SkillExplorer