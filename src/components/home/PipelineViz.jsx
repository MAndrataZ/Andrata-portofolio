import { useEffect, useState } from 'react'
import Chip from '../ui/Chip.jsx'
import './PipelineViz.css'

const defaultSteps = ['Query', 'Retrieve', 'Rerank', 'Generate']

function PipelineViz({ steps = defaultSteps, caption = 'System · RAG pipeline', metrics = [], startDelay = 300 }) {
  const items = steps.map((s) => (typeof s === 'string' ? { name: s } : s))
  const interactive = items.some((s) => s.note)

  const [lit, setLit] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? items.length : 0
  )
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    if (lit >= items.length) return
    const id = setTimeout(() => setLit(lit + 1), lit === 0 ? startDelay : 400)
    return () => clearTimeout(id)
  }, [lit, items.length, startDelay])

  const done = lit >= items.length
  const current = picked ?? (lit > 0 ? lit - 1 : null)
  const note = interactive && current !== null ? items[current].note : ''

  return (
    <figure className="pipeline">
      <figcaption className="label">{caption}</figcaption>
      <ol className="pipeline__steps">
        {items.map((item, i) => {
          const inner = (
            <>
              <span>0{i + 1}</span>
              <span>{item.name}</span>
            </>
          )
          return (
            <li key={item.name} className={`pipeline__item${i < lit ? ' is-lit' : ''}`}>
              {interactive ? (
                <button
                  type="button"
                  className={`pipeline__node${i === current ? ' is-selected' : ''}`}
                  aria-current={i === current ? 'step' : undefined}
                  onClick={() => setPicked(i)}
                  onMouseEnter={() => setPicked(i)}
                  onFocus={() => setPicked(i)}
                >
                  {inner}
                </button>
              ) : (
                <div className="pipeline__node">{inner}</div>
              )}
            </li>
          )
        })}
      </ol>
      {interactive && (
        <p className="pipeline__note" aria-live={done ? 'polite' : 'off'}>
          {note}
        </p>
      )}
      {metrics.length > 0 && (
        <ul className="pipeline__metrics">
          {metrics.map((m) => (
            <li key={m.label}>
              <Chip>
                {m.label.toLowerCase()} {m.value}
              </Chip>
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}

export default PipelineViz