import { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, Play } from 'lucide-react'
import gsap from 'gsap'
import { useMagnetic } from '../hooks/useMagnetic'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const workRef = useMagnetic<HTMLAnchorElement>()
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-media', { scale: 1.08 }, { scale: 1, duration: 1.7 })
        .fromTo('.hero-shade', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2 }, 0.1)
        .fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, duration: 0.85, stagger: 0.12 }, 0.55)
        .fromTo('.hero-actions', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, 1.25)
      const header = document.querySelector('.site-header')
      if (header) gsap.fromTo(header, { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out', delay: 0.25, clearProps: 'clipPath' })
    }, sectionRef)
    return () => context.revert()
  }, [])
  return <section className="hero" id="home" ref={sectionRef}>
    <div className="hero-media" /><div className="hero-shade" />
    <div className="hero-content"><h1 className="hero-title" aria-label="Built for life. Designed for you."><span className="hero-line"><em>BUILT</em> FOR LIFE.</span><span className="hero-line">DESIGNED FOR <em>YOU.</em></span></h1><div className="hero-actions"><a ref={workRef} href="#projects" className="button button-outline">EXPLORE OUR WORK <ArrowDownRight size={18} /></a><a href="#process" className="play-action"><span className="play-icon"><Play size={14} fill="currentColor" /></span>SEE OUR PROCESS</a></div></div>
    <a href="#blueprint" className="hero-scroll">SCROLL TO DISCOVER <ArrowDownRight size={17} /></a>
  </section>
}
