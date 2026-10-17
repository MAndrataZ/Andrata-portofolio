import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import './HomeSection.css'

function HomeSection({ number, label, title, action, children }) {
  return (
    <section className="container home-section" aria-label={label}>
      <SectionHeader number={number} label={label} title={title} action={action} />
      <Reveal>{children}</Reveal>
    </section>
  )
}

export default HomeSection