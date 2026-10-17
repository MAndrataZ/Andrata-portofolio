import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CommandPalette from './CommandPalette.jsx'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { profile } from '../../data/profile.js'
import { projects } from '../../data/projects.js'
import './Layout.css'

function titleFor(pathname) {
  if (pathname === '/') return `${profile.name} · ${profile.roles.join(' / ')}`

  let page = 'Page not found'
  if (pathname === '/projects') page = 'Projects'
  else if (pathname === '/experience') page = 'Experience'
  else if (pathname === '/about') page = 'About'
  else if (pathname.startsWith('/projects/')) {
    const slug = pathname.slice('/projects/'.length)
    page = projects.find((p) => p.slug === slug)?.title ?? 'Project not found'
  }
  return `${page} · ${profile.name}`
}

function Layout() {
  const { pathname } = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)

  useDocumentTitle(titleFor(pathname))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="layout">
      <button
        type="button"
        className="skip-link"
        onClick={() => document.getElementById('main')?.focus()}
      >
        Skip to content
      </button>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

export default Layout