export type HomeMode = 'day' | 'sunset' | 'night'

export const navItems = [
  ['ABOUT', '#about'],
  ['SERVICES', '#services'],
  ['PROJECTS', '#projects'],
] as const

export const modes: Array<{ id: HomeMode; label: string; description: string }> = [
  { id: 'day', label: 'DAY', description: 'Natural daylight' },
  { id: 'sunset', label: 'SUNSET', description: 'Warm evening light' },
  { id: 'night', label: 'NIGHT', description: 'Low-light atmosphere' },
]

export const facadeMaterials = [
  { id: 'concrete', label: 'CONCRETE', description: 'Quiet mineral finish', filter: 'brightness(1.04) saturate(.86)' },
  { id: 'cedar', label: 'CEDAR', description: 'Warm timber rhythm', filter: 'brightness(.98) saturate(1.1) sepia(.08)' },
  { id: 'stone', label: 'STONE', description: 'Textured local weight', filter: 'brightness(.96) saturate(.76) contrast(1.06)' },
  { id: 'metal', label: 'METAL', description: 'Dark precise envelope', filter: 'brightness(.86) saturate(.55) contrast(1.1)' },
] as const

export type FacadeMaterial = (typeof facadeMaterials)[number]['id']

export const services = [
  { title: 'CUSTOM HOME BUILDING', description: 'A single team from first brief through final handover.', image: '/images/hero-residence.png' },
  { title: 'ARCHITECTURAL DESIGN', description: 'Clear spatial decisions grounded in site, light and everyday life.', image: '/images/coast-residence.png' },
  { title: 'INTERIOR DESIGN', description: 'Material, joinery and atmosphere resolved as one language.', image: '/images/courtyard-residence.png' },
  { title: 'RENOVATION', description: 'Precise changes that make an existing home work harder.', image: '/images/service-renovation.png' },
] as const

export type Project = {
  title: string
  city: string
  year: string
  type: string
  image: string
  gallery: string[]
  plan: string
  service: string
  layout: 'wide' | 'landscape' | 'portrait'
}

export const projects: Project[] = [
  {
    title: 'THE RIDGE HOUSE',
    city: 'PORTLAND, OR',
    year: '2025',
    type: 'CUSTOM RESIDENCE',
    image: '/images/project-ridge.png',
    gallery: ['/images/project-ridge.png', '/images/hero-residence.png', '/images/courtyard-residence.png'],
    plan: '/images/blueprint-residence.png',
    service: 'ARCHITECTURE & CONSTRUCTION',
    layout: 'wide',
  },
  {
    title: 'TIDELINE RETREAT',
    city: 'CANNON BEACH, OR',
    year: '2024',
    type: 'NEW BUILD',
    image: '/images/coast-residence.png',
    gallery: ['/images/coast-residence.png', '/images/project-ridge.png', '/images/blueprint-reference.png'],
    plan: '/images/blueprint-reference.png',
    service: 'ARCHITECTURAL DESIGN',
    layout: 'landscape',
  },
  {
    title: 'COURTYARD HOUSE',
    city: 'SEATTLE, WA',
    year: '2024',
    type: 'RENOVATION',
    image: '/images/project-lake.png',
    gallery: ['/images/project-lake.png', '/images/courtyard-residence.png', '/images/service-renovation.png'],
    plan: '/images/blueprint-reference.png',
    service: 'RENOVATION',
    layout: 'portrait',
  },
]

export const trustRows = [
  { title: 'TEAM', text: 'Architects, builders and problem solvers working from one brief.' },
  { title: 'PROCESS', text: 'Brief, design, build and handover — a clear sequence with fewer handoffs.' },
  { title: 'GEOGRAPHY', text: 'The current portfolio references Portland, Seattle and Cannon Beach.' },
  { title: 'PROJECT TERMS', text: 'Warranty and commercial terms are project-specific and should be confirmed in the proposal.' },
] as const
