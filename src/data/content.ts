export const navItems = [
  ['HOME', '#home'],
  ['ABOUT', '#about'],
  ['SERVICES', '#services'],
  ['PROJECTS', '#projects'],
  ['PROCESS', '#process'],
  ['CONTACT', '#contact'],
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

export const processSteps = [
  { title: 'DISCOVER', description: 'We establish the site, the pace of life and the details that must last.' },
  { title: 'DESIGN', description: 'A clear brief becomes a precise spatial language.' },
  { title: 'BUILD', description: 'Craft, coordination and material honesty keep every decision on course.' },
  { title: 'DELIVER', description: 'We hand over a home resolved down to its final line.' },
] as const
