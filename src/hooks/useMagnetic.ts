import { useEffect, useRef } from 'react'

export function useMagnetic<T extends HTMLElement>(strength = 0.16) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    const move = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect()
      element.style.transform = `translate3d(${(event.clientX - bounds.left - bounds.width / 2) * strength}px, ${(event.clientY - bounds.top - bounds.height / 2) * strength}px, 0)`
    }
    const reset = () => { element.style.transform = 'translate3d(0, 0, 0)' }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset) }
  }, [strength])
  return ref
}
