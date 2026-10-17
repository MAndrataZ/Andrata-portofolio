import { Link } from 'react-router-dom'
import HomeSection from './HomeSection.jsx'
import { profile } from '../../data/profile.js'
import { asset } from '../../lib/assets.js'
import './AboutSnippet.css'

const photo = asset(profile.photo)
const education = profile.education?.[0]

function AboutSnippet() {
  return (
    <HomeSection
      number="04"
      label="About"
      title={
        <>
          About <em>me</em>
        </>
      }
      action={
        <Link to="/about" className="label">
          More about me →
        </Link>
      }
    >
      <div className={`about${photo ? ' about--photo' : ''}`}>
        {photo && (
          <img
            className="about__photo"
            src={photo}
            alt={`Portrait of ${profile.name}`}
            width="480"
            height="600"
            loading="lazy"
          />
        )}
        <div>
          {profile.bio?.[0] && <p className="about__bio">{profile.bio[0]}</p>}
          {education && (
            <p className="label about__edu">
              {[education.degree, education.school, education.period].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>
    </HomeSection>
  )
}

export default AboutSnippet