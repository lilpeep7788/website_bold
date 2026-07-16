import { useCallback, useEffect, useRef, useState } from 'react'

const clamp = (value: number) => Math.min(92, Math.max(8, value))
const initialSplit = 56

export function BlueprintComparison() {
  const frameRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef(initialSplit)
  const pendingPointerX = useRef<number | null>(null)
  const animationFrame = useRef<number | null>(null)
  const [split, setSplit] = useState(initialSplit)
  const applySplit = useCallback((value: number, commit = false) => {
    const nextValue = clamp(value)
    splitRef.current = nextValue
    frameRef.current?.style.setProperty('--comparison-split', `${nextValue}%`)
    frameRef.current?.setAttribute('aria-valuenow', String(Math.round(nextValue)))
    if (commit) setSplit(Math.round(nextValue))
  }, [])
  const setPosition = useCallback((clientX: number, commit = false) => {
    const bounds = frameRef.current?.getBoundingClientRect()
    if (bounds) applySplit(((clientX - bounds.left) / bounds.width) * 100, commit)
  }, [applySplit])
  const queuePosition = useCallback((clientX: number) => {
    pendingPointerX.current = clientX
    if (animationFrame.current !== null) return
    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = null
      if (pendingPointerX.current !== null) setPosition(pendingPointerX.current)
    })
  }, [setPosition])
  const finishPointer = useCallback(() => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
    animationFrame.current = null
    if (pendingPointerX.current !== null) setPosition(pendingPointerX.current, true)
    else setSplit(Math.round(splitRef.current))
    pendingPointerX.current = null
  }, [setPosition])
  useEffect(() => () => { if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current) }, [])
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) queuePosition(event.clientX) }
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); applySplit(splitRef.current - 4, true) }
    if (event.key === 'ArrowRight') { event.preventDefault(); applySplit(splitRef.current + 4, true) }
    if (event.key === 'Home') { event.preventDefault(); applySplit(8, true) }
    if (event.key === 'End') { event.preventDefault(); applySplit(92, true) }
  }

  return <section className="blueprint-section section-shell" id="blueprint">
    <div className="blueprint-intro reveal"><p className="section-label">DRAWING / BUILT HOME</p><h2>FROM THE FIRST LINE<br />TO THE FINAL DETAIL.</h2><p className="section-copy">Move the divider or use the arrow keys to compare the working drawing with the completed residence.</p></div>
    <div className="comparison-wrap reveal"><div ref={frameRef} className="comparison-frame" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setPosition(event.clientX, true) }} onPointerMove={onPointerMove} onPointerUp={(event) => { finishPointer(); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }} onPointerCancel={finishPointer} role="slider" tabIndex={0} aria-label="Compare blueprint and completed residence" aria-valuemin={8} aria-valuemax={92} aria-valuenow={Math.round(split)} onKeyDown={onKeyDown}>
      <div className="comparison-blueprint" /><div className="comparison-real" /><span className="comparison-label blueprint-label">BLUEPRINT</span><span className="comparison-label reality-label">REALITY</span><span className="comparison-divider"><span className="comparison-handle" aria-hidden="true" /></span>
    </div></div>
  </section>
}
