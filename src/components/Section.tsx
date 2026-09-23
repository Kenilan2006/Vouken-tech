import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import Reveal from './Reveal'
import RevealLine from './RevealLine'

type SectionProps = {
  children: ReactNode
  id?: string
  /** Tonal step against the charcoal canvas. */
  tone?: 'base' | 'raised' | 'sunken'
  /** Hairline transitions between sections. */
  divider?: 'none' | 'top' | 'bottom' | 'both'
  /** Vertical rhythm. */
  spacing?: 'default' | 'compact' | 'none'
  /** Technical metadata rail rendered above the content. */
  index?: string
  label?: string
  /** Skip the centred max-width container for full-bleed content. */
  bleed?: boolean
  className?: string
  containerClassName?: string
}

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  base: '',
  raised: 'tone-raised',
  sunken: 'tone-sunken',
}

const dividers: Record<NonNullable<SectionProps['divider']>, string> = {
  none: '',
  top: 'border-t border-hairline',
  bottom: 'border-b border-hairline',
  both: 'border-y border-hairline',
}

const spacings: Record<NonNullable<SectionProps['spacing']>, string> = {
  default: 'section-y',
  compact: 'section-y-sm',
  none: '',
}

export default function Section({
  children,
  id,
  tone = 'base',
  divider = 'none',
  spacing = 'default',
  index,
  label,
  bleed = false,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative isolate', tones[tone], dividers[divider], className)}>
      <div
        className={cn(
          spacings[spacing],
          !bleed && 'mx-auto w-full max-w-7xl px-5 sm:px-8',
          containerClassName,
        )}
      >
        {index || label ? (
          <div className="mb-10 flex items-center gap-4 sm:mb-14">
            {index ? (
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground tabular-nums">
                {index}
              </span>
            ) : null}
            {label ? <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary">{label}</span> : null}
            <span className="h-px flex-1 bg-border-strong" aria-hidden="true" />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
