import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Destination } from '@/lib/types'

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
    >
      <Image
        src={destination.image || '/placeholder.svg'}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-secondary-foreground">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-foreground/90">
          <MapPin className="size-3.5" aria-hidden />
          {destination.state}
        </span>
        <h3 className="font-serif text-xl font-semibold">{destination.name}</h3>
        <p className="text-sm text-secondary-foreground/80">{destination.tagline}</p>
      </div>
    </Link>
  )
}
