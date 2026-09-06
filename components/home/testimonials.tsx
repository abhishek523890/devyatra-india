import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by pilgrims and families"
        description="Real experiences from travellers who journeyed with us. (Demonstration reviews.)"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <Quote className="size-7 text-primary/40" aria-hidden />
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground">{t.quote}</blockquote>
            <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < t.rating ? 'size-4 fill-gold text-gold' : 'size-4 text-border'}
                  aria-hidden
                />
              ))}
            </div>
            <figcaption className="flex flex-col border-t border-border pt-4">
              <span className="font-medium text-secondary">{t.name}</span>
              <span className="text-xs text-muted-foreground">
                {t.location} · {t.packageName}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
