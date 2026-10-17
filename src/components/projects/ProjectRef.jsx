import { Link } from 'react-router-dom'
import { getProjectLink } from '../../lib/projects.js'

function ProjectRef({ project }) {
  const link = getProjectLink(project)

  if (link?.to) return <Link to={link.to}>{project.title}</Link>
  if (link?.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    )
  }
  return <span>{project.title}</span>
}

export default ProjectRef