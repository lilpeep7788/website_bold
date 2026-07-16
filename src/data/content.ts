export const navItems = [
  ['HOME', '#home'],
  ['ABOUT', '#about'],
  ['SERVICES', '#services'],
  ['PROJECTS', '#projects'],
] as const

export const services = [
  { title: 'CUSTOM HOME BUILDING', image: '/images/hero-residence.png' },
  { title: 'ARCHITECTURAL DESIGN', image: '/images/coast-residence.png' },
  { title: 'INTERIOR DESIGN', image: '/images/courtyard-residence.png' },
  { title: 'RENOVATION', image: '/images/service-renovation.png' },
] as const

export const projects = [
  { title: 'THE RIDGE HOUSE', city: 'PORTLAND', year: '2025', type: 'CUSTOM RESIDENCE', image: '/images/project-ridge.png', layout: 'wide' },
  { title: 'TIDELINE RETREAT', city: 'CANNON BEACH', year: '2024', type: 'NEW BUILD', image: '/images/coast-residence.png', layout: 'landscape' },
  { title: 'COURTYARD HOUSE', city: 'SEATTLE', year: '2024', type: 'RENOVATION', image: '/images/project-lake.png', layout: 'portrait' },
] as const

