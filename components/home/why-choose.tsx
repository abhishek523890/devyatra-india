import { ShieldCheck, HeartHandshake, Mountain, Headphones, BadgeIndianRupee, CalendarCheck } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const reasons = [
  { icon: ShieldCheck, title: 'Safety first', text: 'Acclimatisation days, on-call medical support and experienced mountain guides on every high-altitude yatra.' },
  { icon: BadgeIndianRupee, title: 'Transparent pricing', text: 'Clear inclusions and exclusions with no hidden charges. Prices always shown in INR.' },
  { icon: HeartHandshake, title: 'Caring hospitality', text: 'Comfortable, clean stays and a team that looks after senior citizens and families with genuine care.' },
  { icon: Mountain, title: 'Local expertise', text: 'Garhwali and regional guides who know the routes, the darshan timings and the mountains intimately.' },
  { icon: Headphones, title: '24x7 assistance', text: 'Round-the-clock support before and during your journey, on phone and WhatsApp.' },
  { icon: CalendarCheck, title: 'Flexible departures', text: 'Fixed-departure group tours and fully customised private itineraries to suit your dates.' },
]

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Why Suresh Tour and Travel"
        title="A yatra you can trust, end to end"
        description="We handle the logistics, safety and comfort so you can focus on the darshan and the journey within."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <r.icon className="size-5" aria-hidden />
            </span>
            <h3 className="font-serif text-lg font-semibold text-secondary">{r.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
