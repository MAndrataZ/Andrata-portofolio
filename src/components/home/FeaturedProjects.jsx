import { Link } from 'react-router-dom'
import HomeSection from './HomeSection.jsx'
import ProjectCard from '../projects/ProjectCard.jsx'
import { getFeatured } from '../../lib/projects.js'
import './FeaturedProjects.css'

function FeaturedProjects() {
  const [flagship, ...rest] = getFeatured().slice(0, 3)
  if (!flagship) return null

  return (
    <HomeSection
      number="01"
      label="Featured projects"
      title={
        <>
          Selected <em>projects</em>
        </>
      }
      action={
        <Link to="/projects" className="label">
          All projects →
        </Link>
      }
    >
      <div className="featured">
        <ProjectCard project={flagship} variant="feature" />
        {rest.length > 0 && (
          <div className="featured__rest">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </div>
    </HomeSection>
  )
}

export default FeaturedProjects