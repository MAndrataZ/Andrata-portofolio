import { projects } from '../data/projects.js'
import { experience } from '../data/experience.js'
import { profile } from '../data/profile.js'

// Flat list, used by the Home skills panel.
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

// Grouped by type, used by the About page skill explorer.
export function getEvidenceGroups(item) {
  const projectRows = (item.projects ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({
      key: p.slug,
      title: p.title,
      meta: [p.type, p.year].filter(Boolean).join(' · '),
      to: `/projects/${p.slug}`,
    }))

  const byOrg = new Map()
  for (const id of item.experience ?? []) {
    const entry = experience.find((e) => e.id === id)
    if (!entry) continue
    const row = byOrg.get(entry.org) ?? { key: entry.org, title: entry.org, roles: [], to: '/experience' }
    row.roles.push(entry.role)
    byOrg.set(entry.org, row)
  }
  const experienceRows = [...byOrg.values()].map((r) => ({
    key: r.key,
    title: r.title,
    meta: r.roles.join(' · '),
    to: r.to,
  }))

  const certRows = (item.certs ?? [])
    .map((id) => (profile.certifications ?? []).find((c) => c.id === id))
    .filter(Boolean)
    .map((c) => ({
      key: c.id,
      title: c.name,
      meta: [c.issuer, c.year].filter(Boolean).join(' · '),
      href: c.url || null,
    }))

  return {
    projects: projectRows,
    experience: experienceRows,
    certs: certRows,
    total: projectRows.length + experienceRows.length + certRows.length,
  }
}