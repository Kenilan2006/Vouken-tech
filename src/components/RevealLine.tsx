import { useEffect, useRef } from 'react'

/**
 * Scroll-triggered hairline that draws across its container. Transform-only
 * (scaleX), so it never shifts layout; resolves instantly under
 * prefers-reduced-motion or when IntersectionObserver is unavailable.
 */
export default function RevealLine({ className, from = 'left' }: { className?: string; from?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} data-reveal-line={from} aria-hidden="true" className={className} />
}