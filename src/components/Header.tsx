import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'

export function Header() {
  const [open, setOpen] = useState(false)
  const ctaRef = useMagnetic<HTMLAnchorElement>()
  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Northline home">NORTHLINE</a>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
      <div className="header-actions"><a ref={ctaRef} href="#contact" className="header-cta">BOOK A CONSULTATION</a><button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open navigation menu"><Menu size={20} /></button></div>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-top"><span className="wordmark">NORTHLINE</span><button className="menu-toggle" onClick={() => setOpen(false)} aria-label="Close navigation menu"><X size={20} /></button></div>
        <nav aria-label="Mobile navigation">{navItems.map(([label, href], index) => <a href={href} onClick={() => setOpen(false)} key={label}><span>0{index + 1}</span>{label}</a>)}</nav>
        <a href="#contact" onClick={() => setOpen(false)} className="header-cta">BOOK A CONSULTATION</a>
      </div>
    </header>
  )
}
