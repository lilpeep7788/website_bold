import { trustRows } from '../data/content'

export function About() {
  return <section className="trust-section section-shell" id="about">
    <div className="trust-lead reveal"><p className="section-label">ABOUT NORTHLINE</p><h2>CLARITY IN THE BRIEF.<br /><em>CARE IN THE BUILD.</em></h2><p className="section-copy">Northline designs and builds private homes made to outlive trends. The studio works across architecture, construction, interiors and renovation with an emphasis on clear decisions.</p></div>
    <div className="trust-detail reveal"><div className="trust-detail-heading"><span className="section-label">THE DETAILS THAT BUILD TRUST</span><span>NO UNVERIFIED CLAIMS</span></div>{trustRows.map((row) => <details key={row.title}><summary><span>{row.title}</span><span className="details-mark" aria-hidden="true">+</span></summary><p>{row.text}</p></details>)}</div>
  </section>
}
