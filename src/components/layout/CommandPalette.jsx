import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../data/profile.js'
import { projects } from '../../data/projects.js'
import './CommandPalette.css'

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`
const groupNames = ['Navigate', 'Projects', 'Actions']

function Panel({ onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [notice, setNotice] = useState('')
  const { email, links } = profile

  const go = (path) => {
    navigate(path)
    onClose()
  }

  const openUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setNotice('Email copied')
      setTimeout(onClose, 800)
    } catch {
      setNotice('Copy failed')
    }
  }

  const items = [
    { id: 'nav-home', group: 'Navigate', label: 'Home', hint: 'Page', run: () => go('/') },
    { id: 'nav-projects', group: 'Navigate', label: 'Projects', hint: 'Page', run: () => go('/projects') },
    { id: 'nav-experience', group: 'Navigate', label: 'Experience', hint: 'Page', run: () => go('/experience') },
    { id: 'nav-about', group: 'Navigate', label: 'About', hint: 'Page', run: () => go('/about') },
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      group: 'Projects',
      label: p.title,
      hint: [p.type, p.year].filter(Boolean).join(' · '),
      keywords: [...(p.tags ?? []), ...(p.stack ?? [])].join(' '),
      run: () => go(`/projects/${p.slug}`),
    })),
    email && { id: 'act-email', group: 'Actions', label: 'Copy email', hint: email, run: copyEmail },
    links.github && {
      id: 'act-github',
      group: 'Actions',
      label: 'Open GitHub',
      hint: 'External link',
      run: () => openUrl(links.github),
    },
    links.linkedin && {
      id: 'act-linkedin',
      group: 'Actions',
      label: 'Open LinkedIn',
      hint: 'External link',
      run: () => openUrl(links.linkedin),
    },
    { id: 'act-resume', group: 'Actions', label: 'Download resume', hint: 'PDF', run: () => openUrl(resumeUrl) },
  ].filter(Boolean)

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = (item) => {
    const haystack = `${item.label} ${item.group} ${item.keywords ?? ''}`.toLowerCase()
    return terms.every((t) => haystack.includes(t))
  }

  const groups = groupNames
    .map((name) => ({ name, items: items.filter((i) => i.group === name && matches(i)) }))
    .filter((g) => g.items.length > 0)
  const flat = groups.flatMap((g) => g.items)
  const activeId = flat[active]?.id

  useEffect(() => {
    if (activeId) document.getElementById(`palette-opt-${activeId}`)?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      flat[active]?.run()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <div className="palette__panel">
      <input
        className="palette__input"
        type="text"
        role="combobox"
        aria-label="Search pages, projects and actions"
        aria-expanded="true"
        aria-controls="palette-list"
        aria-autocomplete="list"
        aria-activedescendant={activeId ? `palette-opt-${activeId}` : undefined}
        placeholder="Search pages, projects, actions"
        autoComplete="off"
        spellCheck={false}
        autoFocus
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
        }}
        onKeyDown={onKeyDown}
      />

      <div
        id="palette-list"
        className="palette__list"
        role="listbox"
        aria-label="Results"
        onMouseDown={(e) => e.preventDefault()}
      >
        {flat.length === 0 && (
          <p className="palette__empty" role="status">
            No results for “{query}”.
          </p>
        )}
        {groups.map((g) => (
          <div key={g.name} role="group" aria-labelledby={`palette-group-${g.name}`}>
            <p id={`palette-group-${g.name}`} className="label palette__group">
              {g.name}
            </p>
            {g.items.map((item) => {
              const i = flat.indexOf(item)
              return (
                <div
                  key={item.id}
                  id={`palette-opt-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  className="palette__option"
                  onMouseMove={() => setActive(i)}
                  onClick={() => item.run()}
                >
                  <span>{item.label}</span>
                  <span className="palette__hint">{item.hint}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="palette__footer">
        <span className="label palette__keys">↑↓ navigate · Enter select · Esc close</span>
        <span className="label" role="status" aria-live="polite">
          {notice}
        </span>
      </div>
    </div>
  )
}

function CommandPalette({ open, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="palette"
      aria-label="Command palette"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {open && <Panel onClose={onClose} />}
    </dialog>
  )
}

export default CommandPalette