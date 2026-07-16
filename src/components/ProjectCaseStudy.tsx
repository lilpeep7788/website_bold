import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Expand, Minus, Plus, X } from 'lucide-react'
import type { FacadeMaterial, Project } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'

type ProjectCaseStudyProps = {
  project: Project
  projectIndex: number
  projectCount: number
  facadeMaterial: FacadeMaterial
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

type View = 'photos' | 'plan'

export function ProjectCaseStudy({ project, projectIndex, projectCount, facadeMaterial, onClose, onPrevious, onNext }: ProjectCaseStudyProps) {
  const [view, setView] = useState<View>('photos')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [planScale, setPlanScale] = useState(1)

  useEffect(() => {
    setView('photos')
    setGalleryIndex(0)
    setPlanScale(1)
  }, [project])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [onClose, onNext, onPrevious])

  const activeImage = project.gallery[galleryIndex]
  return <div className="case-study-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <div className="case-study-header">
        <div><span className="section-label">CASE STUDY {String(projectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}</span><h2 id="case-study-title">{project.title}</h2><p>{project.city} <span aria-hidden="true">/</span> {project.year}</p></div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close case study" title="Close case study"><X size={22} /></button>
      </div>
      <div className="case-study-toolbar" role="tablist" aria-label="Case study views">
        <button type="button" role="tab" aria-selected={view === 'photos'} className={view === 'photos' ? 'is-active' : ''} onClick={() => setView('photos')}>PHOTOS</button>
        <button type="button" role="tab" aria-selected={view === 'plan'} className={view === 'plan' ? 'is-active' : ''} onClick={() => setView('plan')}>PLAN</button>
        <div className="case-study-counter">{view === 'photos' ? `${galleryIndex + 1} / ${project.gallery.length}` : 'INTERACTIVE PLAN'}</div>
      </div>
      <div className="case-study-body">
        <div className="case-study-visual">
          {view === 'photos' ? <>
            <div className="case-study-image-frame"><ResponsiveImage src={activeImage} alt={`${project.title} project view ${galleryIndex + 1}`} decoding="async" sizes="(max-width: 600px) 100vw, 70vw" /></div>
            <div className="case-study-thumbs" aria-label="Project gallery thumbnails">{project.gallery.map((image, index) => <button type="button" className={galleryIndex === index ? 'is-active' : ''} onClick={() => setGalleryIndex(index)} aria-label={`View project image ${index + 1}`} key={image}><ResponsiveImage src={image} alt="" loading="lazy" /></button>)}</div>
          </> : <div className="plan-frame">
            <div className="plan-canvas" style={{ transform: `scale(${planScale})` }}><ResponsiveImage src={project.plan} alt={`${project.title} floor plan`} loading="lazy" /></div>
            <div className="plan-tools" aria-label="Plan zoom controls"><button type="button" onClick={() => setPlanScale((value) => Math.max(0.8, value - 0.2))} aria-label="Zoom plan out" title="Zoom out"><Minus size={18} /></button><button type="button" onClick={() => setPlanScale((value) => Math.min(2, value + 0.2))} aria-label="Zoom plan in" title="Zoom in"><Plus size={18} /></button><button type="button" onClick={() => setPlanScale(1)} aria-label="Reset plan zoom" title="Reset zoom"><Expand size={17} /></button></div>
          </div>}
        </div>
        <aside className="case-study-details">
          <p className="section-label">PROJECT DETAILS</p>
          <dl><div><dt>LOCATION</dt><dd>{project.city}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>TYPE</dt><dd>{project.type}</dd></div><div><dt>SERVICE</dt><dd>{project.service}</dd></div><div><dt>FACADE STUDY</dt><dd>{facadeMaterial.toUpperCase()}</dd></div></dl>
          <p className="case-study-note">Area, materials and completed-volume data are not published in the current project record.</p>
          <a className="button button-gold" href="#contact" onClick={onClose}>INQUIRE ABOUT THIS PROJECT <ArrowRight size={17} /></a>
        </aside>
      </div>
      <footer className="case-study-footer"><button type="button" className="case-nav" onClick={onPrevious}><ChevronLeft size={18} /> PREVIOUS PROJECT</button><span>USE LEFT / RIGHT ARROW KEYS</span><button type="button" className="case-nav" onClick={onNext}>NEXT PROJECT <ChevronRight size={18} /></button></footer>
    </section>
  </div>
}
