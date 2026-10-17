import { useParams } from 'react-router-dom'

function ProjectDetail() {
  const { slug } = useParams()

  return (
    <div className="container page">
      <h1>Project: {slug}</h1>
    </div>
  )
}

export default ProjectDetail