import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Chip from '../components/ui/Chip.jsx'
import StatusDot from '../components/ui/StatusDot.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { projects } from '../data/projects.js'
import { asset } from '../lib/assets.js'

const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBlock: 24 }

function Home() {
  return (
    <div className="container page">
      <SectionHeader
        number="01"
        label="Test"
        title={
          <>
            UI <em>primitives</em>
          </>
        }
        action={
          <Link to="/projects" className="label">
            All projects →
          </Link>
        }
      />

      <p>
        First project from data: <strong>{projects[0].title}</strong>
      </p>
      <p>Asset lookup (expected null): {String(asset('projects/rag-thesis/cover.webp'))}</p>

      <div style={row}>
        <Button to="/projects">
          View projects <ArrowRight size={18} strokeWidth={1.5} />
        </Button>
        <Button variant="secondary" href="https://example.com" external>
          <Download size={18} strokeWidth={1.5} /> Secondary
        </Button>
      </div>

      <div style={row}>
        <Chip>RAG</Chip>
        <Chip>NLP</Chip>
        <Chip active onClick={() => {}}>
          Active filter
        </Chip>
        <Chip onClick={() => {}}>Clickable</Chip>
      </div>

      <div style={row}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <StatusDot /> shipped
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <StatusDot tone="muted" /> archived
        </span>
      </div>

      <div style={{ height: '110vh' }} />
      <Reveal>
        <p>This block fades in once when scrolled into view.</p>
      </Reveal>
    </div>
  )
}

export default Home