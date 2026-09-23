import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  /** Technical index shown to the left of the eyebrow, e.g. "03". Optional. */
  index?: string
  title: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
  size?: 'lg' | 'md'
  className?: string
  copyClassName?: string
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  children,
  align = 'left',
  size = 'lg',
  className,
  copyClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'
  const hasMark = Boolean(index || eyebrow)

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {hasMark ? (
        <div className={cn('flex items-center gap-3', centered && 'justify-center')}>
          {index ? (
            <span className="tabular-nums text-subtle-foreground">{index}</span>
          ) : null}
          {eyebrow ? (
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </span>
          ) : null}
          {!centered ? (
            <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
          ) : null}
        </div>
      ) : null}
      <h2 className={cn('mt-6 text-balance', hasMark && 'mt-4', size === 'lg' ? 'display-lg' : 'display-md')}>
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            'mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg',
            centered && 'mx-auto',
            copyClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
