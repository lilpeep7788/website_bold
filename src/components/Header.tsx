import { useMagnetic } from '../hooks/useMagnetic'
import { navItems } from '../data/content'

export function Header() {
  const ctaRef = useMagnetic<HTMLAnchorElement>()
  return <header className="site-header">
    <a href="#home" className="wordmark" aria-label="Northline home">NORTHLINE</a>
    <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
    <div className="header-actions"><a ref={ctaRef} href="#contact" className="header-cta">BOOK A CONSULTATION</a></div>
  </header>
}
