import { useEffect, useRef, useState } from 'react'

function skipMotion() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  )
}

export default function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(skipMotion)

  useEffect(() => {
    if (visible || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return [ref, visible]
}