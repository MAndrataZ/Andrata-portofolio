import { projects } from '../../data/projects.js'
import { experience } from '../../data/experience.js'
import Reveal from '../ui/Reveal.jsx'
import './ProofStrip.css'

const shipped = experience
  .filter((e) => e.type === 'work')
  .reduce((sum, e) => sum + (e.shipped?.length ?? 0), 0)

const stats = [
  { value: projects.filter((p) => p.type === 'Thesis').length, label: 'Thesis: RAG system evaluated with RAGAS' },
  { value: projects.length, label: 'Projects across AI, data, and web' },
  { value: shipped, label: 'Live radio websites shipped during internship' },
  { value: experience.filter((e) => e.type === 'organization').length, label: 'Organizations' },
].filter((s) => s.value > 0)

function ProofStrip() {
  return (
    <section className="container proof" aria-label="Highlights">
      <Reveal as="ul" className="proof__grid">
        {stats.map((s) => (
          <li key={s.label} className="proof__item">
            <span className="proof__value">{s.value}</span>
            <span className="proof__label">{s.label}</span>
          </li>
        ))}
      </Reveal>
    </section>
  )
}

export default ProofStrip