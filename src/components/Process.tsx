import { useEffect, useState } from 'react'
import { processSteps } from '../data/content'

const processImages = ['/images/courtyard-residence.png', '/images/process-design.png', '/images/coast-residence.png', '/images/process-deliver.png']

export function Process() {
  const [active, setActive] = useState(1)
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-process-step]'))
    const observer = new IntersectionObserver((entries) => { const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (current) setActive(Number((current.target as HTMLElement).dataset.processStep)) }, { threshold: [0.45, 0.7] })
    nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect()
  }, [])
  const step = processSteps[active]
  return <section className="process-section section-shell" id="process"><div className="process-list"><p className="section-label">OUR PROCESS</p>{processSteps.map((item, index) => <button data-process-step={index} type="button" className={`process-row ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} key={item.title}><strong>{item.title}</strong>{active === index && <em>{item.description}</em>}</button>)}</div><div className="process-photo" style={{ backgroundImage: `url(${processImages[active]})` }} aria-label={`Architectural detail for ${step.title}`} /></section>
}
