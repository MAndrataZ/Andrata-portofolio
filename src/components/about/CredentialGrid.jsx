import { ArrowUpRight } from 'lucide-react'
import { skillGroups } from '../../data/skills.js'
import './CredentialGrid.css'

function monogram(issuer = '') {
  const abbreviation = issuer.match(/\(([A-Za-z]{2,})\)/)
  if (abbreviation) return abbreviation[1].slice(0, 4).toUpperCase()
  const words = issuer.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return words
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const allSkills = skillGroups.flatMap((g) => g.items)
const backedSkills = (id) => allSkills.filter((s) => s.certs?.includes(id)).length

function CredentialGrid({ items }) {
  return (
    <ul className="cred-grid">
      {items.map((c) => {
        const backs = c.id ? backedSkills(c.id) : 0
        return (
          <li key={c.id ?? c.name} className="cred">
            <span className="cred__badge" aria-hidden="true">
              {monogram(c.issuer)}
            </span>
            <div className="cred__body">
              <p className="cred__name">
                {c.url ? (
                  <a className="cred__link" href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  c.name
                )}
              </p>
              <p className="cred__meta">{[c.issuer, c.year].filter(Boolean).join(' · ')}</p>
              {backs > 0 && (
                <p className="cred__meta">
                  Backs {backs} skill{backs > 1 ? 's' : ''}
                </p>
              )}
            </div>
            {c.url && <ArrowUpRight className="cred__go" size={18} strokeWidth={1.5} aria-hidden="true" />}
          </li>
        )
      })}
    </ul>
  )
}

export default CredentialGrid