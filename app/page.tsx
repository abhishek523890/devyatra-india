import Link from 'next/link'
import { ArrowRight, CalendarDays, ShieldPlus, PhoneCall } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { WhyChoose } from '@/components/home/why-choose'
import { ProcessSteps } from '@/components/home/process-steps'
import { Testimonials } from '@/components/home/testimonials'
import { SectionHeading } from '@/components/site/section-heading'
import { PackageCard } from '@/components/site/package-card'
import { DestinationCard } from '@/components/site/destination-card'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { destinations, faqs } from '@/lib/data'
import { getPublishedPackages } from '@/lib/packages'
import { formatDate, formatINR } from '@/lib/format'

export default async function HomePage() {
  const allPackages = await getPublishedPackages()
  const categories = Array.from(new Set(allPackages.map((p) => p.category)))
  const featured = allPackages.filter((p) => p.featured)
  const featuredPackages = (featured.length > 0 ? featured : allPackages).slice(0, 6)
  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4)

  const upcoming = allPackages
    .flatMap((p) => p.departures.map((d) => ({ pkg: p, dep: d })))
    .sort((a, b) => a.dep.date.localeCompare(b.dep.date))
    .slice(0, 4)

  const trustStats = [
    { value: '12,000+', label: 'Pilgrims served' },
    { value: '25+', label: 'Sacred destinations' },
    { value: '4.8/5', label: 'Average rating' },
    { value: '10+ yrs', label: 'Guiding experience' },
  ]

  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="font-serif text-3xl font-semibold text-primary">{s.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore by type"
          title="Find the journey that calls you"
          align="left"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/packages?category=${encodeURIComponent(c)}`}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular packages */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Popular yatras" title="Most-booked pilgrimage packages" align="left" />
          <Link
            href="/packages"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all packages
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Sacred places" title="Featured destinations" align="left" />
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              All destinations
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featuredDestinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      <WhyChoose />
      <ProcessSteps />

      {/* Upcoming departures */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fixed departures"
          title="Upcoming group departures"
          description="Join a scheduled group tour on these confirmed dates. Limited seats per departure."
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <table className="hidden w-full border-collapse text-left text-sm md:table">
            <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-5 py-4 font-semibold">Package</th>
                <th className="px-5 py-4 font-semibold">Departure</th>
                <th className="px-5 py-4 font-semibold">Seats left</th>
                <th className="px-5 py-4 font-semibold">From</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {upcoming.map(({ pkg, dep }) => (
                <tr key={dep.id} className="hover:bg-muted/30">
                  <td className="px-5 py-4 font-medium text-secondary">{pkg.name}</td>
                  <td className="px-5 py-4">{formatDate(dep.date)}</td>
                  <td className="px-5 py-4">
                    <span className={dep.availableSeats <= 6 ? 'font-semibold text-destructive' : ''}>
                      {dep.availableSeats} of {dep.totalSeats}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-secondary">{formatINR(pkg.discountedPrice)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/booking?package=${pkg.slug}&departure=${dep.id}`}
                      className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Book now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <ul className="divide-y divide-border bg-card md:hidden">
            {upcoming.map(({ pkg, dep }) => (
              <li key={dep.id} className="flex flex-col gap-2 p-5">
                <span className="font-medium text-secondary">{pkg.name}</span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-4" aria-hidden />
                    {formatDate(dep.date)}
                  </span>
                  <span className={dep.availableSeats <= 6 ? 'font-semibold text-destructive' : ''}>
                    {dep.availableSeats} seats left
                  </span>
                  <span className="font-medium text-secondary">{formatINR(pkg.discountedPrice)}</span>
                </div>
                <Link
                  href={`/booking?package=${pkg.slug}&departure=${dep.id}`}
                  className="mt-1 inline-flex w-fit items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  Book now
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Safety + Custom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <ShieldPlus className="size-6" aria-hidden />
            </span>
            <h3 className="font-serif text-2xl font-semibold text-secondary">Safety &amp; assistance</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              High-altitude yatras include acclimatisation, medical kits and oxygen support where needed. Our ground
              team is reachable 24x7 and we monitor weather and road conditions throughout your journey.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              How we keep you safe
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-primary p-8 text-primary-foreground">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/15">
              <PhoneCall className="size-6" aria-hidden />
            </span>
            <h3 className="font-serif text-2xl font-semibold">Can&apos;t find the perfect yatra?</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/90">
              Tell us your preferred destinations, dates, group size and budget, and we&apos;ll design a fully
              customised pilgrimage just for you.
            </p>
            <Link
              href="/custom-tour"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
            >
              Request a custom tour
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div className="mt-10">
          <FaqAccordion items={faqs.slice(0, 6)} />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still have questions?{' '}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Get in touch
          </Link>
        </p>
      </section>
    </>
  )
}
