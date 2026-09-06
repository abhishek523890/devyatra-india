import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { CustomTourForm } from '@/components/site/custom-tour-form'
import { CalendarDays, Route, HeartHandshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Plan a Custom Pilgrimage',
  description:
    'Tell us your destinations, dates and budget and DevYatra India will design a personalised spiritual itinerary just for you.',
}

const steps = [
  { icon: Route, title: 'Share your vision', text: 'Pick the shrines you want to visit and your travel style.' },
  { icon: CalendarDays, title: 'We design it', text: 'Our journey planners craft a paced, safe itinerary and quote.' },
  { icon: HeartHandshake, title: 'You travel', text: 'Confirm, and we handle stays, transport, permits and guides.' },
]

export default function CustomTourPage() {
  return (
    <>
      <PageHero
        title="Design your own sacred journey"
        description="Every devotee's path is personal. Tell us what you have in mind and we'll shape a pilgrimage around it."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Custom Tour' }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="size-5 text-primary" aria-hidden />
                </div>
                <span className="font-serif text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-foreground">Tell us about your journey</h2>
          <CustomTourForm />
        </div>
      </section>
    </>
  )
}
