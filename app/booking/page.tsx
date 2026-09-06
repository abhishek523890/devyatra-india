import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingFlow } from '@/components/booking/booking-flow'

export const metadata: Metadata = {
  title: 'Complete your booking',
  description: 'Enter traveller details, review your itinerary and reserve your pilgrimage seat.',
}

export default function BookingPage() {
  return (
    <div className="pt-24">
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-32 text-center text-muted-foreground">Loading booking…</div>
        }
      >
        <BookingFlow />
      </Suspense>
    </div>
  )
}
