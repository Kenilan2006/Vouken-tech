import { useEffect, useRef } from 'react'

/**
 * Hairline reading-progress rail pinned to the top of the viewport.
 * Written straight to the DOM node so scrolling never triggers a React render.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px" aria-hidden="true">
      <div ref={barRef} className="h-px origin-left bg-primary/70" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
