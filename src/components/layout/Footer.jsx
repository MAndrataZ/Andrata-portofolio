import { profile } from '../../data/profile.js'
import './Footer.css'

function formatMonth(value) {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1).toLocaleString('en', { month: 'short', year: 'numeric' })
}

function Footer() {
  const { name, availability, email, links, lastUpdated } = profile

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p>
            © {new Date().getFullYear()} {name} · {availability}
          </p>
          <ul className="footer__links">
            {email && (
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            )}
            {links.github && (
              <li>
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            )}
            {links.linkedin && (
              <li>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
        <p className="footer__meta">
          Built with React + Vite · Last updated {formatMonth(lastUpdated)}
        </p>
      </div>
    </footer>
  )
}

export default Footer