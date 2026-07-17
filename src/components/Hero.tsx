import { ArrowDownRight } from 'lucide-react'
import type { HomeMode } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import { ModeRail } from './ModeRail'

type HeroProps = {
  mode: HomeMode
  onModeChange: (mode: HomeMode) => void
}

export function Hero({ mode, onModeChange }: HeroProps) {
  const workRef = useMagnetic<HTMLAnchorElement>()
  return <section className={`hero hero--${mode}`} id="home">
    <div className="hero-media" role="img" aria-label="Modern concrete and glass residence at dusk" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-content">
      <h1 className="hero-title"><em>BUILT</em> FOR LIFE.</h1>
      <p className="hero-description">Architecture and construction for custom homes and high-end renovations. One clear team from the first line to the final detail.</p>
      <div className="hero-actions"><a ref={workRef} href="#projects" className="button button-outline">EXPLORE OUR WORK <ArrowDownRight size={18} /></a></div>
    </div>
    <ModeRail mode={mode} onChange={onModeChange} />
  </section>
}
