import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import StatusDot from '../ui/StatusDot.jsx'
import PipelineViz from './PipelineViz.jsx'
import { profile } from '../../data/profile.js'
import { getFeatured } from '../../lib/projects.js'
import './Hero.css'

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

function renderHeadline(text) {
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))
}

function Hero() {
  const flagship = getFeatured()[0]
  const metrics = flagship?.metrics?.slice(0, 3) ?? []
  const { github, linkedin } = profile.links

  return (
    <section className="container hero" aria-labelledby="hero-title">
      <div>
        <p className="label hero__status">
          <StatusDot /> {profile.availability} · {profile.roles.join(' / ')}
        </p>
        <h1 id="hero-title" className="hero__title">
          {renderHeadline(profile.headline)}
        </h1>
        <p className="hero__summary">
          <strong>{profile.name}.</strong> {profile.summary}
        </p>
        <div className="hero__actions">
          <Button to="/projects">
            View projects <ArrowRight size={18} strokeWidth={1.5} />
          </Button>
          <Button variant="secondary" href={resumeUrl} download>
            Download CV
          </Button>
        </div>
        {(github || linkedin) && (
          <ul className="hero__links">
            {github && (
              <li>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
      <PipelineViz metrics={metrics} />
    </section>
  )
}

export default Hero