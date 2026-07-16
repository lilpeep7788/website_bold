import { useEffect, useState } from 'react'
import { ArrowRight, Expand, Minus, Plus, X } from 'lucide-react'
import type { FacadeMaterial, Project } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'

type ProjectCaseStudyProps = {
  project: Project
  facadeMaterial: FacadeMaterial
  facadeImage: string
  onClose: () => void
}

type View = 'photos' | 'plan'

export function ProjectCaseStudy({ project, facadeMaterial, facadeImage, onClose }: ProjectCaseStudyProps) {
  const [view, setView] = useState<View>('photos')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [planScale, setPlanScale] = useState(1)

  useEffect(() => {
    setView('photos')
    setGalleryIndex(0)
    setPlanScale(1)
  }, [project, facadeImage])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [onClose])

  const caseStudyImages = [facadeImage, ...project.gallery.filter((image) => image !== facadeImage)]
  const activeImage = caseStudyImages[galleryIndex]
  return <div className="case-study-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <div className="case-study-header">
        <div><span className="section-label">PROJECT CASE STUDY</span><h2 id="case-study-title">{project.title}</h2><p>{project.city} <span aria-hidden="true">/</span> {project.year}</p></div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close case study" title="Close case study"><X size={22} /></button>
      </div>
      <div className="case-study-toolbar" role="tablist" aria-label="Case study views">
        <button type="button" role="tab" aria-selected={view === 'photos'} className={view === 'photos' ? 'is-active' : ''} onClick={() => setView('photos')}>PHOTOS</button>
        <button type="button" role="tab" aria-selected={view === 'plan'} className={view === 'plan' ? 'is-active' : ''} onClick={() => setView('plan')}>PLAN</button>
        <div className="case-study-counter">{view === 'photos' ? 'PROJECT GALLERY' : 'INTERACTIVE PLAN'}</div>
      </div>
      <div className="case-study-body">
        <div className="case-study-visual">
          {view === 'photos' ? <>
            <div className="case-study-image-frame"><ResponsiveImage src={activeImage} alt={`${project.title} project view`} decoding="async" sizes="(max-width: 600px) 100vw, 70vw" /></div>
            <div className="case-study-thumbs" aria-label="Project gallery thumbnails">{caseStudyImages.map((image, index) => <button type="button" className={galleryIndex === index ? 'is-active' : ''} onClick={() => setGalleryIndex(index)} aria-label={index === 0 ? 'View facade study' : 'View project gallery image'} key={image}><ResponsiveImage src={image} alt="" loading="lazy" /></button>)}</div>
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
    </section>
  </div>
}
