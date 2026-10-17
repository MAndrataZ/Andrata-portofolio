import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Chip from '../components/ui/Chip.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'ai-llm', label: 'AI & LLM' },
  { key: 'data-science', label: 'Data Science' },
  { key: 'web', label: 'Web' },
]

const counts = Object.fromEntries(
  categories.map((c) => [
    c.key,
    c.key === 'all' ? projects.length : projects.filter((p) => p.category === c.key).length,
  ])
)

function sortProjects(list, sort) {
  const copy = [...list]
  if (sort === 'newest') return copy.sort((a, b) => b.year - a.year)
  return copy.sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
    if (a.featured) return (a.featuredRank ?? 99) - (b.featuredRank ?? 99)
    return b.year - a.year
  })
}

function Projects() {
  const [params, setParams] = useSearchParams()

  const rawCat = params.get('cat')
  const cat = categories.some((c) => c.key === rawCat) ? rawCat : 'all'
  const q = params.get('q') ?? ''
  const sort = params.get('sort') === 'newest' ? 'newest' : 'featured'

  function update(key, value, defaultValue) {
    const next = new URLSearchParams(params)
    if (!value || value === defaultValue) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const matchesSearch = (p) => {
    const haystack = [p.title, p.tagline, ...(p.tags ?? []), ...(p.stack ?? [])].join(' ').toLowerCase()
    return terms.every((t) => haystack.includes(t))
  }

  const visible = sortProjects(
    projects.filter((p) => (cat === 'all' || p.category === cat) && matchesSearch(p)),
    sort
  )

  return (
    <div className="container page">
      <header className="projects__head">
        <h1>
          All <em>projects</em>
        </h1>
        <p className="projects__lead">Filter by area or search by tool.</p>
      </header>

      <div className="projects__controls">
        <div className="projects__chips" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <Chip key={c.key} active={cat === c.key} onClick={() => update('cat', c.key, 'all')}>
              {c.label} <span className="projects__count">{counts[c.key]}</span>
            </Chip>
          ))}
        </div>

        <div className="projects__tools">
          <label className="projects__search">
            <span className="sr-only">Search projects</span>
            <Search size={18} strokeWidth={1.5} aria-hidden="true" />
            <input
              type="search"
              value={q}
              placeholder="Search title, tags, stack"
              onChange={(e) => update('q', e.target.value, '')}
            />
          </label>

          <label className="projects__sort">
            <span className="label">Sort</span>
            <select value={sort} onChange={(e) => update('sort', e.target.value, 'featured')}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
      </div>

      <h2 className="sr-only">Project list</h2>
      <p className="label projects__result" aria-live="polite">
        {visible.length} of {projects.length} projects
      </p>

      {visible.length > 0 ? (
        <ul className="projects__grid">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="projects__empty">
          <p>Nothing matches that yet. Try another keyword or clear the filters.</p>
          <Button variant="secondary" onClick={() => setParams({}, { replace: true })}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default Projects