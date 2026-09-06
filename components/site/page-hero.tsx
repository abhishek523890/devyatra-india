import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function PageHero({
  title,
  description,
  breadcrumbs,
}: {
  title: string
  description?: string
  breadcrumbs?: { href?: string; label: string }[]
}) {
  return (
    <section className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-secondary-foreground/70">
              {breadcrumbs.map((c, i) => (
                <li key={i} className="inline-flex items-center gap-1">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-secondary-foreground">{c.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight className="size-4" aria-hidden />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-serif text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary-foreground/80">{description}</p>
        )}
      </div>
    </section>
  )
}
