import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import StatusDot from '../ui/StatusDot.jsx'
import PipelineViz from './PipelineViz.jsx'
import { profile } from '../../data/profile.js'
import { heroPhoto } from '../../lib/profilePhotos.js'
import './Hero.css'

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

function renderHeadline(text) {
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))
}

function Hero() {
  const { github, linkedin } = profile.links
  const process = profile.howIWork

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

      <div className={`hero__stage${heroPhoto ? ' hero__stage--photo' : ''}`}>
        {heroPhoto && (
          <div className="hero__portrait">
            <div className="hero__card" aria-hidden="true" />
            <img
              className="hero__photo"
              src={heroPhoto}
              alt={`Portrait of ${profile.name}`}
              width="960"
              height="1200"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__scan" aria-hidden="true" />
          </div>
        )}
        <PipelineViz
          steps={process?.steps}
          caption={process?.caption}
          startDelay={heroPhoto ? 1200 : 300}
        />
      </div>
    </section>
  )
}

export default Hero