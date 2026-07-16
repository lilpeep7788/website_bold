import { useCallback, useRef, useState } from 'react'

const clamp = (value: number) => Math.min(92, Math.max(8, value))

export function BlueprintComparison() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(56)
  const setPosition = useCallback((clientX: number) => {
    const bounds = frameRef.current?.getBoundingClientRect()
    if (bounds) setSplit(clamp(((clientX - bounds.left) / bounds.width) * 100))
  }, [])
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) setPosition(event.clientX) }
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); setSplit((value) => clamp(value - 4)) }
    if (event.key === 'ArrowRight') { event.preventDefault(); setSplit((value) => clamp(value + 4)) }
    if (event.key === 'Home') { event.preventDefault(); setSplit(8) }
    if (event.key === 'End') { event.preventDefault(); setSplit(92) }
  }

  return <section className="blueprint-section section-shell" id="blueprint">
    <div className="blueprint-intro reveal"><p className="section-label">DRAWING / BUILT HOME</p><h2>FROM THE FIRST LINE<br />TO THE FINAL DETAIL.</h2><p className="section-copy">Move the divider or use the arrow keys to compare the working drawing with the completed residence.</p></div>
    <div className="comparison-wrap reveal"><div ref={frameRef} className="comparison-frame" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setPosition(event.clientX) }} onPointerMove={onPointerMove} onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }} role="slider" tabIndex={0} aria-label="Compare blueprint and completed residence" aria-valuemin={8} aria-valuemax={92} aria-valuenow={Math.round(split)} onKeyDown={onKeyDown}>
      <div className="comparison-blueprint" /><div className="comparison-real" style={{ clipPath: `inset(0 0 0 ${split}%)` }} /><span className="comparison-label blueprint-label">BLUEPRINT</span><span className="comparison-label reality-label">REALITY</span><span className="comparison-divider" style={{ left: `${split}%` }}><span className="comparison-handle" aria-hidden="true" /></span>
    </div></div>
  </section>
}
