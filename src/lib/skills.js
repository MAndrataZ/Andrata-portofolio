import { projects } from '../data/projects.js'
import { experience } from '../data/experience.js'
import { profile } from '../data/profile.js'

// A skill can point to projects, experience entries, and certifications as evidence.
export function getEvidence(item) {
  const fromProjects = (item.projects ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)

  // several roles at the same organization show up as one link
  const orgs = new Map()
  for (const id of item.experience ?? []) {
    const entry = experience.find((e) => e.id === id)
    if (entry && !orgs.has(entry.org)) {
      orgs.set(entry.org, { slug: `org-${entry.org}`, title: entry.org, to: '/experience' })
    }
  }

  const fromCerts = (item.certs ?? [])
    .map((id) => (profile.certifications ?? []).find((c) => c.id === id))
    .filter(Boolean)
    .map((c) =>
      c.url
        ? { slug: `cert-${c.id}`, title: c.name, links: { demo: c.url } }
        : { slug: `cert-${c.id}`, title: c.name, to: '/about' }
    )

  return [...fromProjects, ...orgs.values(), ...fromCerts]
}