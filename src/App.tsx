import { useEffect, useMemo, useState } from 'react'
import { About } from './components/About'
import { BlueprintComparison } from './components/BlueprintComparison'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { facadeMaterials, services, type FacadeMaterial, type HomeMode } from './data/content'

export default function App() {
  const [mode, setMode] = useState<HomeMode>('sunset')
  const [facadeMaterial, setFacadeMaterial] = useState<FacadeMaterial>(facadeMaterials[0].id)
  const [service, setService] = useState<string>(services[0].title)
  const config = useMemo(() => ({ service, facadeMaterial, mode }), [service, facadeMaterial, mode])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) observer.unobserve(entry.target); entry.target.classList.toggle('is-visible', entry.isIntersecting) })
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <>
    <Header />
    <main>
      <Hero mode={mode} onModeChange={setMode} />
      <Projects facadeMaterial={facadeMaterial} onFacadeMaterialChange={setFacadeMaterial} />
      <BlueprintComparison />
      <Services selectedService={service} onServiceChange={setService} facadeMaterial={facadeMaterial} mode={mode} />
      <About />
      <Contact config={config} />
    </main>
    <Footer />
  </>
}
