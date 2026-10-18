import { projects } from '../data/projects.js'
import { experience } from '../data/experience.js'

// A skill can point to projects and/or experience entries as evidence.
export function getEvidence(item) {
  const fromProjects = (item.projects ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)

  const fromExperience = (item.experience ?? [])
    .map((id) => experience.find((e) => e.id === id))
    .filter(Boolean)
    .map((e) => ({ slug: e.id, title: e.org, to: '/experience' }))

  return [...fromProjects, ...fromExperience]
}