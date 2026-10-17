import Button from '../components/ui/Button.jsx'
import './NotFound.css'

function NotFound() {
  return (
    <div className="container page">
      <p className="label">404</p>
      <h1>
        Page not <em>found</em>
      </h1>
      <p className="not-found__text">
        That address doesn’t lead anywhere. Head back to the home page or browse the projects.
      </p>
      <div className="not-found__actions">
        <Button to="/">Back to home</Button>
        <Button variant="secondary" to="/projects">
          View projects
        </Button>
      </div>
    </div>
  )
}

export default NotFound