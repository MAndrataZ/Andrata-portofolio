import { Mail } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import SkillExplorer from '../components/about/SkillExplorer.jsx'
import CredentialGrid from '../components/about/CredentialGrid.jsx'
import { profile } from '../data/profile.js'
import { skillGroups } from '../data/skills.js'
import { aboutPhoto as photo } from '../lib/profilePhotos.js'
import './About.css'

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

function About() {
  const { email, links, currently } = profile
  const bio = profile.bio ?? []
  const education = (profile.education ?? []).filter((e) => e.school || e.degree)
  const certifications = (profile.certifications ?? []).filter((c) => c.name)

  const sections = [
    education.length > 0 && {
      key: 'education',
      label: 'Education',
      title: (
        <>
          Where I <em>studied</em>
        </>
      ),
      content: (
        <ul className="edu-list">
          {education.map((e) => (
            <li key={e.school + e.degree}>
              {e.period && <p className="label">{e.period}</p>}
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              {e.note && <p className="edu__note">{e.note}</p>}
            </li>
          ))}
        </ul>
      ),
    },
    skillGroups.length > 0 && {
      key: 'skills',
      label: 'Skills',
      title: (
        <>
          What I <em>use</em>, and where
        </>
      ),
      content: <SkillExplorer />,
    },
    certifications.length > 0 && {
      key: 'certifications',
      label: 'Certifications',
      title: (
        <>
          Certifications <em>earned</em>
        </>
      ),
      content: <CredentialGrid items={certifications} />,
    },
    {
      key: 'contact',
      label: 'Contact',
      title: (
        <>
          Get in <em>touch</em>
        </>
      ),
      content: (
        <>
          <div className="about-contact">
            {email && (
              <Button href={`mailto:${email}`}>
                <Mail size={18} strokeWidth={1.5} /> Email
              </Button>
            )}
            {links.linkedin && (
              <Button variant="secondary" href={links.linkedin} external>
                LinkedIn
              </Button>
            )}
            {links.github && (
              <Button variant="secondary" href={links.github} external>
                GitHub
              </Button>
            )}
            <Button variant="secondary" href={resumeUrl} external>
              Resume
            </Button>
          </div>
          <p className="label about-contact__note">{profile.availability}</p>
        </>
      ),
    },
  ].filter(Boolean)

  return (
    <div className="container page">
      <h1 className="about-title">
        About <em>me</em>
      </h1>

      <div className={`about-intro${photo ? ' about-intro--photo' : ''}`}>
        {photo && (
          <img
            className="about-intro__photo"
            src={photo}
            alt={`Portrait of ${profile.name}`}
            width="480"
            height="600"
          />
        )}
        <div className="about-intro__text">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {currently && (
            <aside className="about-now">
              <p className="label">Currently</p>
              <p>{currently}</p>
            </aside>
          )}
        </div>
      </div>

      {sections.map((s, i) => (
        <section key={s.key} className="about-section" aria-label={s.label}>
          <SectionHeader number={String(i + 1).padStart(2, '0')} label={s.label} title={s.title} />
          {s.content}
        </section>
      ))}
    </div>
  )
}

export default About