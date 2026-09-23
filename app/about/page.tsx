import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { ShieldCheck, HeartHandshake, Mountain, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Suresh Tour and Travel',
  description:
    'Suresh Tour and Travel crafts guided spiritual pilgrimages across India — Char Dham, Do Dham, Vaishno Devi and more — with safety, comfort and devotion at the heart of every journey.',
  alternates: { canonical: '/about' },
}

const values = [
  { icon: ShieldCheck, title: 'Safety first', text: 'Vetted operators, mountain-ready vehicles and on-call medical support on every departure.' },
  { icon: HeartHandshake, title: 'Devotion led', text: 'Itineraries paced for darshan and reflection, not rushed sightseeing.' },
  { icon: Mountain, title: 'Local expertise', text: 'Guides who know the Himalayan routes, rituals and the right times to travel.' },
  { icon: Users, title: 'Family friendly', text: 'Journeys designed to welcome elders, children and first-time yatris alike.' },
]

const stats = [
  { value: '12,000+', label: 'Pilgrims guided' },
  { value: '15', label: 'Years of service' },
  { value: '40+', label: 'Sacred routes' },
  { value: '4.8/5', label: 'Traveller rating' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Journeys of devotion, guided with care"
        description="For over a decade, Suresh Tour and Travel has helped families walk the sacred routes of the subcontinent with confidence and calm."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground text-balance">Our story</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Suresh Tour and Travel began with a simple belief: a pilgrimage should lift the spirit, not exhaust the body.
                What started as a handful of Char Dham trips has grown into a trusted name for spiritual travel across
                the Himalayas and the Ganga plains.
              </p>
              <p>
                We handle the logistics — permits, stays, transport and safety — so you can focus on the darshan. Every
                itinerary is paced with acclimatisation, rest and time for reflection built in.
              </p>
              <p>
                Our teams are local, our groups are small, and our commitment to your wellbeing is absolute.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-pilgrims.png"
              alt="A guide with a small group of pilgrims before a Himalayan temple"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-secondary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-foreground">What we stand for</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <v.icon className="size-6 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 text-center">
        <div className="rounded-3xl border border-border bg-card p-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-balance">
            Ready to plan your sacred journey?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Browse our guided packages or tell us your vision and we&apos;ll design a custom itinerary.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/packages" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
              View packages
            </Link>
            <Link href="/custom-tour" className="rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted">
              Plan a custom tour
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
