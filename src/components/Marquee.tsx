import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'

/**
 * Slow technology ticker used as a section transition.
 * Content is duplicated once so the -50% loop is seamless; the duplicate is
 * hidden from assistive technology. Pauses on hover/focus, while off-screen
 * (IntersectionObserver), on coarse pointers, and under
 * prefers-reduced-motion (see main.css).
 */
export default function Marquee({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const track = [...items, ...items]
  const rootRef = useRef<HTMLDivElement | null>(null)

  /* Pause the infinite loop while the ticker is off-screen so it costs no
     compositor work on pages/sections the visitor is not reading. */
  useEffect(() => {
    const root = rootRef.current
    const trackEl = root?.querySelector<HTMLElement>('.marquee-track')
    if (!root || !trackEl || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          trackEl.classList.toggle('is-paused', !entry.isIntersecting)
        })
      },
      { threshold: 0 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={cn('marquee border-y border-hairline bg-surface py-5', className)}>
      <div className="marquee-track">
        {track.map((item, position) => (
          <span
            key={`${item}-${position}`}
            className="flex items-center"
            aria-hidden={position >= items.length ? true : undefined}
          >
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground px-6 sm:px-10">
              {item}
            </span>
            <span className="mx-4 size-1 rounded bg-border-strong sm:mx-8" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
