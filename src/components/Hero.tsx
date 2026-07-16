import { ArrowDownRight } from 'lucide-react'
import { useRef } from 'react'
import type { HomeMode } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import { ModeRail } from './ModeRail'

type HeroProps = {
  mode: HomeMode
  onModeChange: (mode: HomeMode) => void
}

const hotspots = [
  { className: 'hotspot-one', href: '#projects', label: 'Featured residence' },
  { className: 'hotspot-two', href: '#blueprint', label: 'Compare drawing and built home' },
  { className: 'hotspot-three', href: '#contact', label: 'Start a project' },
]

export function Hero({ mode, onModeChange }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const workRef = useMagnetic<HTMLAnchorElement>()
  return <section className={`hero hero--${mode}`} id="home" ref={heroRef}>
    <div className="hero-media" role="img" aria-label="Modern concrete and glass residence at dusk" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-content">
      <h1 className="hero-title"><span className="hero-line"><em>BUILT</em> FOR LIFE.</span><span className="hero-line">DESIGNED FOR <em>YOU.</em></span></h1>
      <p className="hero-description">Architecture and construction for custom homes and high-end renovations. One clear team from the first line to the final detail.</p>
      <div className="hero-actions"><a ref={workRef} href="#projects" className="button button-outline">EXPLORE OUR WORK <ArrowDownRight size={18} /></a></div>
    </div>
    <div className="hero-hotspots" aria-label="Explore the home">
      {hotspots.map((hotspot) => <a className={`hero-hotspot ${hotspot.className}`} href={hotspot.href} aria-label={hotspot.label} title={hotspot.label} key={hotspot.href}><span className="hotspot-dot" /><span className="hotspot-tooltip">{hotspot.label}</span></a>)}
    </div>
    <ModeRail mode={mode} onChange={onModeChange} />
  </section>
}
