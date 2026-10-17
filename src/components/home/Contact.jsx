import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import HomeSection from './HomeSection.jsx'
import Button from '../ui/Button.jsx'
import { profile } from '../../data/profile.js'
import './Contact.css'

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

const messages = {
  idle: 'Copy email',
  copied: 'Copied',
  failed: 'Copy failed',
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const { email, links } = profile

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <HomeSection
      number="05"
      label="Contact"
      title={
        <>
          Let’s <em>talk</em>
        </>
      }
    >
      {profile.lookingFor && <p className="contact__lead">{profile.lookingFor}</p>}

      <div className="contact__actions">
        {email && (
          <Button variant={status === 'failed' ? 'secondary' : 'primary'} onClick={copyEmail}>
            {status === 'copied' ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}
            <span className={status === 'failed' ? 'contact__fail' : undefined}>{messages[status]}</span>
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
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? 'Email copied' : status === 'failed' ? 'Copy failed' : ''}
      </span>

      <p className="label contact__availability">{profile.availability}</p>
    </HomeSection>
  )
}

export default Contact