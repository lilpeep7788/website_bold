import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/content'

export function Services() {
  const [active, setActive] = useState(0)
  return <section className="services-section" id="services"><div className="section-shell"><p className="section-label reveal">SERVICES</p></div><div className="service-list">{services.map((service, index) => <button type="button" className={`service-row ${active === index ? 'is-active' : ''}`} key={service.title} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span className="service-image" style={{ backgroundImage: `url(${service.image})` }} /><span className="service-title">{service.title}</span><ArrowRight className="service-arrow" size={31} /></button>)}</div></section>
}
