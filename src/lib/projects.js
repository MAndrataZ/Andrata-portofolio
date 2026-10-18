import { projects } from '../data/projects.js'

export const categoryLabels = {
  'ai-llm': 'AI / LLM',
  'data-science': 'Data science',
  web: 'Web',
}

export function statusTone(status) {
  return status === 'shipped' ? 'accent' : 'muted'
}

export function getFeatured() {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
}

// Where a project card should lead: its case study, an external link, or nowhere.
export function getProjectLink(project) {
  if (project.to) return { to: project.to }
  if (project.caseStudy) return { to: `/projects/${project.slug}` }
  const href = project.links?.github || project.links?.demo
  return href ? { href } : null
}