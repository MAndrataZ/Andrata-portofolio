import { useEffect, useState } from 'react'
import Chip from '../ui/Chip.jsx'
import './PipelineViz.css'

const steps = ['Query', 'Retrieve', 'Rerank', 'Generate']

function PipelineViz({ metrics = [] }) {
  const [lit, setLit] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? steps.length : 0
  )

  useEffect(() => {
    if (lit >= steps.length) return
    const id = setTimeout(() => setLit(lit + 1), lit === 0 ? 300 : 400)
    return () => clearTimeout(id)
  }, [lit])

  return (
    <figure className="pipeline">
      <figcaption className="label">System · RAG pipeline</figcaption>
      <ol className="pipeline__steps">
        {steps.map((name, i) => (
          <li key={name} className={`pipeline__node${i < lit ? ' is-lit' : ''}`}>
            <span className="pipeline__index">0{i + 1}</span>
            <span>{name}</span>
          </li>
        ))}
      </ol>
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