import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Command, Menu, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { profile } from '../../data/profile.js'
import './Navbar.css'

const links = [
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/about', label: 'About' },
]

const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)
const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          andrata
        </Link>

        <nav className="navbar__links" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="navbar__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__palette"
            aria-label="Open command palette"
            onClick={() => onOpenPalette?.()}
          >
            <Command size={18} strokeWidth={1.5} />
            <span>{isMac ? '⌘K' : 'Ctrl K'}</span>
          </button>
          <Button variant="secondary" href={resumeUrl} external className="navbar__resume">
            Resume
          </Button>
          <button
            type="button"
            className="navbar__menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="navbar__sheet" aria-label="Mobile">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="navbar__sheet-link" onClick={close}>
              {link.label}
            </NavLink>
          ))}
          <Button variant="secondary" href={resumeUrl} external>
            Resume
          </Button>
        </nav>
      )}
    </header>
  )
}

export default Navbar