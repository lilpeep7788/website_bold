import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

const clamp = (value: number) => Math.min(92, Math.max(8, value))

export function BlueprintComparison() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(56)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const setPosition = useCallback((clientX: number) => { const bounds = frameRef.current?.getBoundingClientRect(); if (bounds) setSplit(clamp(((clientX - bounds.left) / bounds.width) * 100)) }, [])
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) setPosition(event.clientX)
    const bounds = event.currentTarget.getBoundingClientRect()
    setOffset({ x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 12, y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 12 })
  }
  return <section className="blueprint-section section-shell" id="blueprint">
    <div className="blueprint-intro reveal"><h2>FROM THE FIRST LINE<br />TO THE FINAL DETAIL.</h2></div>
    <div className="comparison-wrap reveal"><p className="section-label">FROM BLUEPRINT TO REALITY</p><div ref={frameRef} className="comparison-frame" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setPosition(event.clientX) }} onPointerMove={onPointerMove} onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)} role="slider" tabIndex={0} aria-label="Drag to compare blueprint and completed residence" aria-valuemin={8} aria-valuemax={92} aria-valuenow={Math.round(split)} onKeyDown={(event) => { if (event.key === 'ArrowLeft') setSplit((value) => clamp(value - 4)); if (event.key === 'ArrowRight') setSplit((value) => clamp(value + 4)) }}>
      <div className="comparison-blueprint" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }} /><div className="comparison-real" style={{ clipPath: `inset(0 0 0 ${split}%)`, transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }} /><span className="comparison-label blueprint-label">BLUEPRINT</span><span className="comparison-label reality-label">REALITY</span><div className="comparison-divider" style={{ left: `${split}%` }}><button type="button" className="comparison-handle" aria-label="Move comparison divider"><MoveHorizontal size={20} /></button></div>
    </div></div>
  </section>
}
