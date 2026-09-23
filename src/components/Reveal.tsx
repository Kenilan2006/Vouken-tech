import { useEffect, useRef, type ReactNode } from 'react'

type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'number' | 'none'

/**
 * Scroll-triggered entrance used across the marketing pages.
 *
 * The element starts hidden through the [data-reveal] rules in main.css and is
 * switched to .is-visible the first time it enters the viewport. Motion is
 * skipped entirely when the visitor prefers reduced motion or when
 * IntersectionObserver is unavailable, so content is never stranded invisible.
 * Variants only change the transform (fade + translate, horizontal slides,
 * scale, or a small numeral rise) — never layout.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  once = true,
  variant = 'up',
}: {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
  variant?: RevealVariant
}) {
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
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <div ref={ref} data-reveal={variant} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
