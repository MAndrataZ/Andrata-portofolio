import './GeneratedCover.css'

function seedFrom(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makeRandom(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function GeneratedCover({ slug }) {
  const random = makeRandom(seedFrom(slug))
  const points = Array.from({ length: 9 }, (_, i) => [i * 20, 15 + random() * 60])
  const line = points.map(([x, y]) => `${x},${y.toFixed(1)}`).join(' ')

  return (
    <svg className="cover" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[22, 45, 68].map((y) => (
        <line key={y} x1="0" x2="160" y1={y} y2={y} className="cover__grid" />
      ))}
      {[40, 80, 120].map((x) => (
        <line key={x} x1={x} x2={x} y1="0" y2="90" className="cover__grid" />
      ))}
      <polyline points={line} className="cover__line" />
      {points
        .filter((_, i) => i % 2 === 0)
        .map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2" className="cover__node" />
        ))}
    </svg>
  )
}

export default GeneratedCover