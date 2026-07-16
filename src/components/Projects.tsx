import { useCallback, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { facadeMaterials, projects, type FacadeMaterial } from '../data/content'
import { ProjectCaseStudy } from './ProjectCaseStudy'
import { ResponsiveImage } from './ResponsiveImage'

type ProjectsProps = {
  facadeMaterial: FacadeMaterial
  onFacadeMaterialChange: (material: FacadeMaterial) => void
}

export function Projects({ facadeMaterial, onFacadeMaterialChange }: ProjectsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedProject = selectedIndex === null ? null : projects[selectedIndex]
  const openProject = useCallback((index: number) => setSelectedIndex(index), [])
  const closeProject = useCallback(() => setSelectedIndex(null), [])
  const featuredProject = projects[0]
  const featuredMaterial = facadeMaterials.find((material) => material.id === facadeMaterial) ?? facadeMaterials[0]

  return <section className="projects-section section-shell" id="projects">
    <div className="section-intro reveal"><div><p className="section-label">SELECTED PROJECT</p><h2>A HOME WITH<br /><em>A LONG VIEW.</em></h2></div><p className="section-copy">A custom residence shaped by site, light and the way it will be lived in.</p></div>
    <article className="featured-project reveal">
      <button type="button" className={`featured-project-media material-${facadeMaterial}`} onClick={() => openProject(0)} aria-label={`Open case study for ${featuredProject.title}`}>
        <ResponsiveImage src={featuredMaterial.image} alt={`${featuredProject.title} with ${featuredMaterial.label.toLowerCase()} facade`} fetchPriority="high" decoding="async" sizes="(max-width: 820px) 100vw, 65vw" />
        <span className="media-caption">THE RIDGE HOUSE <span>OPEN CASE STUDY <ArrowUpRight size={18} /></span></span>
      </button>
      <div className="featured-project-info">
        <h3>{featuredProject.title}</h3>
        <p className="project-summary">A custom residence from the current Northline portfolio, presented as an editorial case study with the working drawing and built home kept in the same frame.</p>
        <dl className="project-facts"><div><dt>LOCATION</dt><dd>{featuredProject.city}</dd></div><div><dt>YEAR</dt><dd>{featuredProject.year}</dd></div><div><dt>TYPE</dt><dd>{featuredProject.type}</dd></div><div><dt>SERVICE</dt><dd>{featuredProject.service}</dd></div></dl>
        <div className="material-study"><div className="control-heading"><span>FACADE MATERIAL STUDY</span><strong>{facadeMaterial.toUpperCase()}</strong></div><div className="material-options" role="group" aria-label="Facade material study">{facadeMaterials.map((material) => <button type="button" className={facadeMaterial === material.id ? 'is-active' : ''} aria-pressed={facadeMaterial === material.id} title={material.description} onClick={() => onFacadeMaterialChange(material.id)} key={material.id}><span className={`material-swatch material-swatch--${material.id}`} /><span>{material.label}</span></button>)}</div></div>
        <button type="button" className="text-link text-link-button" onClick={() => openProject(0)}>VIEW FULL CASE STUDY <ArrowUpRight size={18} /></button>
      </div>
    </article>
    {selectedProject && <ProjectCaseStudy project={selectedProject} facadeMaterial={facadeMaterial} facadeImage={featuredMaterial.image} onClose={closeProject} />}
  </section>
}
