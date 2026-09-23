import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { PackageCard } from '@/components/site/package-card'
import { getDestinationBySlug, getPackagesByDestination, destinations } from '@/lib/data'

const SITE_URL = 'https://sureshtourandtravel.com'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  if (!destination) {
    return { title: 'Destination Not Found', robots: { index: false, follow: false } }
  }

  const title = `${destination.name} Travel Guide & Yatra Packages`
  const description = `${destination.tagline}. Explore travel information, best time to visit and available pilgrimage journeys with Suresh Tour and Travel.`
  const canonicalUrl = `${SITE_URL}/destinations/${destination.slug}`

  return {
    title,
    description,
    keywords: [
      destination.name,
      `${destination.name} yatra`,
      `${destination.name} travel guide`,
      `${destination.name} tour package`,
      'pilgrimage destinations India',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Suresh Tour and Travel',
      locale: 'en_IN',
      images: destination.image
        ? [{ url: destination.image, width: 1200, height: 630, alt: destination.name }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: destination.image ? [destination.image] : [],
    },
  }
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  if (!destination) notFound()

  const relatedPackages = getPackagesByDestination(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    url: `${SITE_URL}/destinations/${destination.slug}`,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: destination.state,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={destination.image || '/placeholder.svg'}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-secondary/20" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-secondary-foreground/80">
            <Link href="/destinations" className="hover:text-primary">Destinations</Link>
            <span className="mx-1">/</span>
            <span className="text-secondary-foreground">{destination.name}</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-sm font-medium text-primary-foreground">
            <MapPin className="size-4" aria-hidden />
            {destination.state} · {destination.region}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-balance text-secondary-foreground sm:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-secondary-foreground/85">{destination.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground">About {destination.name}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{destination.description}</p>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-foreground">Travel notes</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="font-medium text-foreground">Best time to visit</dt>
                  <dd className="text-muted-foreground">{destination.bestTime}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="font-medium text-foreground">Region</dt>
                  <dd className="text-muted-foreground">{destination.region}, {destination.state}</dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>

        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                Journeys to {destination.name}
              </h2>
              <p className="mt-1 text-muted-foreground">Guided packages that include this destination.</p>
            </div>
            <Link href="/packages" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all packages
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {relatedPackages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
              <p className="text-muted-foreground">No scheduled packages for this destination yet. Reach out for a custom itinerary.</p>
              <Link href="/custom-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Plan a custom tour
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
