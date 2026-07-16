import { ArrowDownRight, Check } from 'lucide-react'
import { facadeMaterials, services, type FacadeMaterial, type HomeMode } from '../data/content'

type ServicesProps = {
  selectedService: string
  onServiceChange: (service: string) => void
  facadeMaterial: FacadeMaterial
  mode: HomeMode
}

export function Services({ selectedService, onServiceChange, facadeMaterial, mode }: ServicesProps) {
  const activeService = services.find((service) => service.title === selectedService) ?? services[0]
  const materialLabel = facadeMaterials.find((material) => material.id === facadeMaterial)?.label ?? facadeMaterial.toUpperCase()
  return <section className="configurator-section" id="services">
    <div className="section-shell">
      <div className="section-intro reveal"><div><p className="section-label">START WITH A CLEAR BRIEF</p><h2>SHAPE THE<br /><em>FIRST MOVE.</em></h2></div><p className="section-copy">Choose a starting service. Your selection follows you into the contact form so the first conversation starts with useful context.</p></div>
      <div className="configurator-grid reveal">
        <div className="service-selector" role="group" aria-label="Choose a service">{services.map((service, index) => <button type="button" className={`service-option ${selectedService === service.title ? 'is-active' : ''}`} aria-pressed={selectedService === service.title} onClick={() => onServiceChange(service.title)} key={service.title}><span className="service-number">0{index + 1}</span><span><strong>{service.title}</strong><small>{service.description}</small></span><Check className="service-check" size={20} /></button>)}</div>
        <aside className="brief-preview" aria-label="Selected project brief"><p className="section-label">YOUR WORKING BRIEF</p><h3>{activeService.title}</h3><p>{activeService.description}</p><dl><div><dt>FACADE STUDY</dt><dd>{materialLabel}</dd></div><div><dt>HOME MODE</dt><dd>{mode.toUpperCase()}</dd></div></dl><a className="button button-gold" href="#contact">CARRY THIS BRIEF <ArrowDownRight size={17} /></a></aside>
      </div>
    </div>
  </section>
}
