import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return
    const context = gsap.context(() => { gsap.utils.toArray<HTMLElement>('.project-media').forEach((media) => gsap.fromTo(media, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: media, scrub: true, start: 'top bottom', end: 'bottom top' } })) }, sectionRef)
    return () => context.revert()
  }, [])
  return <section className="projects-section section-shell" id="projects" ref={sectionRef}><div className="projects-heading reveal"><p className="section-label">SELECTED PROJECTS</p><h2>HOMES WITH<br /><em>A LONG VIEW.</em></h2></div><div className="project-grid">{projects.map((project) => <article className={`project project-${project.layout} reveal`} key={project.title}><div className="project-image-frame"><div className="project-media" style={{ backgroundImage: `url(${project.image})` }} /></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.city} <span>/</span> {project.year} <span>/</span> {project.type}</p></div><a href="#contact" className="text-link">VIEW PROJECT <ArrowUpRight size={16} /></a></div></article>)}</div></section>
}
