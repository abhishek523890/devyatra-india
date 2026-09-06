'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ['/placeholder.svg']

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={list[active] || '/placeholder.svg'}
          alt={`${alt} — image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
      {list.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition',
                active === i ? 'ring-primary' : 'ring-transparent hover:ring-border',
              )}
            >
              <Image src={img || '/placeholder.svg'} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
