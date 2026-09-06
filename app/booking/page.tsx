import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingFlow } from '@/components/booking/booking-flow'
import { getPublishedPackageBySlug } from '@/lib/packages'

export const metadata: Metadata = {
  title: 'Complete your booking',
  description: 'Enter traveller details, review your itinerary and reserve your pilgrimage seat.',
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>
}) {
  const { package: slug } = await searchParams
  const pkg = slug ? await getPublishedPackageBySlug(slug) : null

  return (
    <div className="pt-24">
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-32 text-center text-muted-foreground">Loading booking…</div>
        }
      >
        <BookingFlow pkg={pkg} />
      </Suspense>
    </div>
  )
}
