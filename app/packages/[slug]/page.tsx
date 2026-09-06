import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Clock,
  TrendingUp,
  CalendarDays,
  Users,
  Bed,
  Bus,
  Utensils,
  FileText,
  HeartPulse,
  ChevronRight,
  Check,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Gallery } from '@/components/packages/gallery'
import { BookingWidget } from '@/components/packages/booking-widget'
import { InclusionTabs } from '@/components/packages/inclusion-tabs'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { PackageCard } from '@/components/site/package-card'
import { SectionHeading } from '@/components/site/section-heading'
import { getPackageBySlug, getRelatedPackages, getDestinationBySlug, packages } from '@/lib/data'
import { formatDate } from '@/lib/format'

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pkg = getPackageBySlug(slug)
  if (!pkg) return { title: 'Package not found' }
  return {
    title: pkg.name,
    description: pkg.shortDescription,
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      images: [{ url: pkg.coverImage }],
    },
  }
}

export default async function PackageDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ departure?: string }>
}) {
  const { slug } = await params
  const { departure } = await searchParams
  const pkg = getPackageBySlug(slug)
  if (!pkg) notFound()

  const destination = getDestinationBySlug(pkg.destinationSlug)
  const related = getRelatedPackages(pkg)

  const facts = [
    { icon: Clock, label: 'Duration', value: `${pkg.days} Days / ${pkg.nights} Nights` },
    { icon: MapPin, label: 'Route', value: `${pkg.startLocation} → ${pkg.endLocation}` },
    { icon: TrendingUp, label: 'Difficulty', value: pkg.difficulty },
    { icon: CalendarDays, label: 'Best season', value: pkg.bestSeason },
    { icon: Users, label: 'Group size', value: `Up to ${pkg.maxGroupSize}` },
    { icon: Utensils, label: 'Meals', value: pkg.mealsIncluded },
  ]

  return (
    <>
      {/* Breadcrumb + title band */}
      <section className="border-b border-border bg-secondary pt-24 pb-8 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-secondary-foreground/70">
              <li className="inline-flex items-center gap-1">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="size-4" aria-hidden />
              </li>
              <li className="inline-flex items-center gap-1">
                <Link href="/packages" className="hover:text-primary">Packages</Link>
                <ChevronRight className="size-4" aria-hidden />
              </li>
              <li className="text-secondary-foreground">{pkg.name}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" className="bg-gold text-gold-foreground">{pkg.category}</Badge>
            {destination && (
              <span className="inline-flex items-center gap-1 text-sm text-secondary-foreground/80">
                <MapPin className="size-4 text-primary" aria-hidden />
                {destination.name}, {destination.state}
              </span>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold text-balance sm:text-4xl">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-secondary-foreground/80">{pkg.shortDescription}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <div className="flex flex-col gap-10">
            <Gallery images={pkg.gallery} alt={pkg.name} />

            {/* Quick facts */}
            <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-4" aria-hidden />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{f.label}</span>
                    <span className="text-sm font-medium text-secondary">{f.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Overview */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-secondary">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{pkg.detailedDescription}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-secondary">Day-by-day itinerary</h2>
              <ol className="mt-5 flex flex-col gap-4">
                {pkg.itinerary.map((day) => (
                  <li key={day.day} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    <span className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <span className="text-[0.6rem] tracking-wide uppercase opacity-70">Day</span>
                      <span className="font-serif text-base leading-none font-semibold">{day.day}</span>
                    </span>
                    <div>
                      <h3 className="font-medium text-secondary">{day.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{day.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Inclusions / Exclusions */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-secondary">What&apos;s included</h2>
              <div className="mt-5">
                <InclusionTabs inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
              </div>
            </section>

            {/* Logistics */}
            <section className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Bed, title: 'Accommodation', text: pkg.accommodation },
                { icon: Bus, title: 'Transportation', text: pkg.transportation },
                { icon: FileText, title: 'Required documents', text: pkg.requiredDocuments.join(', ') },
                { icon: HeartPulse, title: 'Health & fitness', text: pkg.healthInfo },
              ].map((b) => (
                <div key={b.title} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
                  <span className="inline-flex items-center gap-2 font-medium text-secondary">
                    <b.icon className="size-4 text-primary" aria-hidden />
                    {b.title}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </section>

            {/* Departures */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-secondary">Available departures</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {pkg.departures.map((d) => (
                  <li key={d.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
                    <span className="inline-flex items-center gap-2 font-medium text-secondary">
                      <CalendarDays className="size-4 text-primary" aria-hidden />
                      {formatDate(d.date)}
                    </span>
                    <span className={d.availableSeats <= 6 ? 'text-sm font-semibold text-destructive' : 'text-sm text-muted-foreground'}>
                      {d.availableSeats} / {d.totalSeats} seats
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            {pkg.faqs.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-semibold text-secondary">Frequently asked questions</h2>
                <div className="mt-5">
                  <FaqAccordion items={pkg.faqs} />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <BookingWidget pkg={pkg} initialDepartureId={departure} />
          </aside>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="You may also like" title="Related yatras" align="left" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PackageCard key={r.id} pkg={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
