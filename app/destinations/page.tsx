import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { DestinationCard } from '@/components/site/destination-card'
import { destinations } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Sacred Destinations',
  description:
    'Explore the sacred pilgrimage destinations of India — from the Himalayan dhams of Kedarnath and Badrinath to the ghats of Varanasi and the cave shrine of Vaishno Devi.',
}

export default function DestinationsPage() {
  const regions = Array.from(new Set(destinations.map((d) => d.region)))

  return (
    <>
      <PageHero
        title="Sacred destinations across India"
        description="Each place on our map carries centuries of devotion. Choose a destination to learn its story and find the journeys that lead there."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Destinations' }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        {regions.map((region) => (
          <section key={region} className="mb-14 last:mb-0">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">{region}</h2>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations
                .filter((d) => d.region === region)
                .map((d) => (
                  <DestinationCard key={d.slug} destination={d} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
