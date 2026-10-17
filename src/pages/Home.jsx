import Hero from '../components/home/Hero.jsx'
import ProofStrip from '../components/home/ProofStrip.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import SkillsSnapshot from '../components/home/SkillsSnapshot.jsx'
import ExperienceSnapshot from '../components/home/ExperienceSnapshot.jsx'
import AboutSnippet from '../components/home/AboutSnippet.jsx'
import Contact from '../components/home/Contact.jsx'

function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <FeaturedProjects />
      <SkillsSnapshot />
      <ExperienceSnapshot />
      <AboutSnippet />
      <Contact />
    </>
  )
}

export default Home