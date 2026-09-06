import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary uppercase">
          <span className="h-px w-6 bg-primary/50" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-semibold text-balance text-secondary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-2xl text-base leading-relaxed text-muted-foreground', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
