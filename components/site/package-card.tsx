import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin, TrendingUp, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatINR } from '@/lib/format'
import type { Package } from '@/lib/types'

function lowestAvailability(pkg: Package) {
  return pkg.departures.reduce((min, d) => Math.min(min, d.availableSeats), Infinity)
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const seatsLeft = lowestAvailability(pkg)
  const discountPct = Math.round(((pkg.basePrice - pkg.discountedPrice) / pkg.basePrice) * 100)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.coverImage || '/placeholder.svg'}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="maroon" className="bg-secondary/90 text-secondary-foreground backdrop-blur">
            {pkg.category}
          </Badge>
          {discountPct > 0 && (
            <Badge variant="gold" className="bg-gold/95 text-gold-foreground backdrop-blur">
              {discountPct}% off
            </Badge>
          )}
        </div>
        {seatsLeft <= 6 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white">
            {seatsLeft} seats left
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {pkg.days}D / {pkg.nights}N
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {pkg.startLocation}
          </span>
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="size-3.5" aria-hidden />
            {pkg.difficulty}
          </span>
        </div>

        <h3 className="font-serif text-lg leading-snug font-semibold text-secondary">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-primary">
            {pkg.name}
          </Link>
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pkg.shortDescription}</p>

        <div className="mt-1 flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="block text-xs text-muted-foreground">From (per person)</span>
            <span className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-semibold text-secondary">
                {formatINR(pkg.discountedPrice)}
              </span>
              {discountPct > 0 && (
                <span className="text-sm text-muted-foreground line-through">{formatINR(pkg.basePrice)}</span>
              )}
            </span>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
