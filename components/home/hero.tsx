'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, Star } from 'lucide-react'
import { destinations } from '@/lib/data'

export function Hero() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [travellers, setTravellers] = useState('2')

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('destination', destination)
    if (duration) params.set('duration', duration)
    if (travellers) params.set('travellers', travellers)
    router.push(`/packages?${params.toString()}`)
  }

  return (
    <section className="relative -mt-16 flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/hero-himalaya.png"
        alt="Himalayan temple at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
            <Star className="size-4 fill-primary text-primary" aria-hidden />
            Trusted by 12,000+ pilgrims across India
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            Sacred journeys, thoughtfully arranged
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            From Char Dham to Vaishno Devi, Kashi to Amarnath — curated pilgrimage tours with trusted guides,
            comfortable stays and secure booking.
          </p>
        </div>

        <form
          onSubmit={onSearch}
          className="mt-10 grid gap-3 rounded-2xl border border-white/20 bg-background/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_auto] lg:items-end"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="h-destination" className="text-xs font-semibold text-secondary">
              Destination
            </label>
            <select
              id="h-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
            >
              <option value="">Any destination</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="h-duration" className="text-xs font-semibold text-secondary">
              Duration
            </label>
            <select
              id="h-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
            >
              <option value="">Any length</option>
              <option value="short">1–4 days</option>
              <option value="medium">5–7 days</option>
              <option value="long">8+ days</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="h-travellers" className="text-xs font-semibold text-secondary">
              Travellers
            </label>
            <input
              id="h-travellers"
              type="number"
              min={1}
              max={30}
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Search className="size-4" aria-hidden />
            Search
          </button>
        </form>
      </div>
    </section>
  )
}
