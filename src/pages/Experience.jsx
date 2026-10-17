import SectionHeader from '../components/ui/SectionHeader.jsx'
import TimelineItem from '../components/experience/TimelineItem.jsx'
import { experience } from '../data/experience.js'
import { sortNewest } from '../lib/experience.js'
import './Experience.css'

function Experience() {
  const work = sortNewest(experience.filter((e) => e.type === 'work'))
  const organizations = sortNewest(experience.filter((e) => e.type === 'organization'))

  return (
    <div className="container page">
      <h1 className="exp__title">
        Work and <em>organizations</em>
      </h1>

      {work.length > 0 && (
        <section className="exp__section" aria-label="Work">
          <SectionHeader
            number="01"
            label="Work"
            title={
              <>
                Work <em>experience</em>
              </>
            }
          />
          <ol className="exp__list">
            {work.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </ol>
        </section>
      )}

      {organizations.length > 0 && (
        <section className="exp__section" aria-label="Organizations">
          <SectionHeader
            number="02"
            label="Organizations"
            title={
              <>
                Organization <em>involvement</em>
              </>
            }
          />
          <ol className="exp__list">
            {organizations.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

export default Experience