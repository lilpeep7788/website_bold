import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { About } from './components/About'
import { BlueprintComparison } from './components/BlueprintComparison'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Services } from './components/Services'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => { gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.82, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })) })
    return () => context.revert()
  }, [])
  return <><ScrollProgress /><Header /><main><Hero /><BlueprintComparison /><Services /><Projects /><Process /><About /><Contact /></main><Footer /></>
}
