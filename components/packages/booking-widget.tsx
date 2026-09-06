'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, MessageCircle, CalendarDays } from 'lucide-react'
import { calculatePrice, formatINR, formatDate } from '@/lib/format'
import type { Package } from '@/lib/types'
import { cn } from '@/lib/utils'

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  hint?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-secondary">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="inline-flex items-center rounded-full border border-border">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex size-8 items-center justify-center rounded-full text-secondary disabled:opacity-40"
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex size-8 items-center justify-center rounded-full text-secondary disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function BookingWidget({ pkg, initialDepartureId }: { pkg: Package; initialDepartureId?: string }) {
  const router = useRouter()
  const initialDep =
    pkg.departures.find((d) => d.id === initialDepartureId) ?? pkg.departures[0]
  const [departureId, setDepartureId] = useState(initialDep?.id ?? '')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [singleRooms, setSingleRooms] = useState(0)

  const departure = pkg.departures.find((d) => d.id === departureId)
  const seatsNeeded = adults + children
  const overCapacity = departure ? seatsNeeded > departure.availableSeats : false

  const price = calculatePrice({
    perAdult: pkg.discountedPrice,
    perChild: pkg.childPrice,
    singleSupplement: pkg.singleSupplement,
    taxPercent: pkg.taxPercent,
    adults,
    children,
    singleRooms,
  })

  function proceed() {
    const params = new URLSearchParams({
      package: pkg.slug,
      departure: departureId,
      adults: String(adults),
      children: String(children),
      rooms: String(singleRooms),
    })
    router.push(`/booking?${params.toString()}`)
  }

  const whatsapp = `https://wa.me/919000000000?text=${encodeURIComponent(
    `Namaste! I'm interested in the ${pkg.name} package. Could you share more details?`,
  )}`

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-xs text-muted-foreground">From (per adult)</span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-semibold text-secondary">{formatINR(pkg.discountedPrice)}</span>
            {pkg.basePrice > pkg.discountedPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatINR(pkg.basePrice)}</span>
            )}
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {pkg.days}D / {pkg.nights}N
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="w-departure" className="text-sm font-medium text-secondary">
          Departure date
        </label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <select
            id="w-departure"
            value={departureId}
            onChange={(e) => setDepartureId(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background pr-3 pl-9 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
          >
            {pkg.departures.map((d) => (
              <option key={d.id} value={d.id}>
                {formatDate(d.date)} — {d.availableSeats} seats left
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-y border-border py-4">
        <Stepper label="Adults" hint="12 years and above" value={adults} min={1} max={pkg.maxGroupSize} onChange={setAdults} />
        {pkg.childPrice > 0 && (
          <Stepper label="Children" hint="5–11 years" value={children} min={0} max={pkg.maxGroupSize} onChange={setChildren} />
        )}
        <Stepper label="Single rooms" hint={`+${formatINR(pkg.singleSupplement)} each`} value={singleRooms} min={0} max={adults} onChange={setSingleRooms} />
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Adults × {adults}</dt>
          <dd className="font-medium">{formatINR(price.adultTotal)}</dd>
        </div>
        {children > 0 && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Children × {children}</dt>
            <dd className="font-medium">{formatINR(price.childTotal)}</dd>
          </div>
        )}
        {singleRooms > 0 && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Single room supplement</dt>
            <dd className="font-medium">{formatINR(price.roomSupplement)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Taxes ({pkg.taxPercent}%)</dt>
          <dd className="font-medium">{formatINR(price.tax)}</dd>
        </div>
        <div className="mt-1 flex justify-between border-t border-border pt-2">
          <dt className="font-semibold text-secondary">Total</dt>
          <dd className="font-serif text-lg font-semibold text-secondary">{formatINR(price.total)}</dd>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <dt>Advance to reserve (25%)</dt>
          <dd>{formatINR(price.advance)}</dd>
        </div>
      </dl>

      {overCapacity && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
          Only {departure?.availableSeats} seats left on this departure. Reduce travellers or pick another date.
        </p>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={proceed}
          disabled={overCapacity || !departureId}
          className={cn(
            'inline-flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90',
            (overCapacity || !departureId) && 'pointer-events-none opacity-50',
          )}
        >
          Book now
        </button>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-emerald-600/40 bg-emerald-600/10 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-600/20"
        >
          <MessageCircle className="size-4" aria-hidden />
          Enquire on WhatsApp
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Submitting a booking sends a request. Seats are confirmed by our team before payment.
      </p>
    </div>
  )
}
