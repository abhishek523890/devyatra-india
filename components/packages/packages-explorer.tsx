'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import { PackageCard } from '@/components/site/package-card'
import { packages, destinations, categories } from '@/lib/data'
import { cn } from '@/lib/utils'

type Duration = '' | 'short' | 'medium' | 'long'

const priceBands = [
  { id: '', label: 'Any price' },
  { id: 'low', label: 'Under ₹15,000' },
  { id: 'mid', label: '₹15,000 – ₹30,000' },
  { id: 'high', label: 'Above ₹30,000' },
]

function matchesDuration(days: number, duration: Duration) {
  if (duration === 'short') return days <= 4
  if (duration === 'medium') return days >= 5 && days <= 7
  if (duration === 'long') return days >= 8
  return true
}

function matchesPrice(price: number, band: string) {
  if (band === 'low') return price < 15000
  if (band === 'mid') return price >= 15000 && price <= 30000
  if (band === 'high') return price > 30000
  return true
}

export function PackagesExplorer({
  initialDestination = '',
  initialCategory = '',
  initialDuration = '',
}: {
  initialDestination?: string
  initialCategory?: string
  initialDuration?: string
}) {
  const [query, setQuery] = useState('')
  const [destination, setDestination] = useState(initialDestination)
  const [category, setCategory] = useState(initialCategory)
  const [duration, setDuration] = useState<Duration>((initialDuration as Duration) || '')
  const [priceBand, setPriceBand] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let list = packages.filter((p) => p.status === 'published')
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q),
      )
    }
    if (destination) list = list.filter((p) => p.destinationSlug === destination)
    if (category) list = list.filter((p) => p.category === category)
    if (difficulty) list = list.filter((p) => p.difficulty === difficulty)
    list = list.filter((p) => matchesDuration(p.days, duration))
    list = list.filter((p) => matchesPrice(p.discountedPrice, priceBand))

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      case 'duration':
        list = [...list].sort((a, b) => a.days - b.days)
        break
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return list
  }, [query, destination, category, duration, priceBand, difficulty, sort])

  const activeCount = [destination, category, duration, priceBand, difficulty].filter(Boolean).length

  function reset() {
    setQuery('')
    setDestination('')
    setCategory('')
    setDuration('')
    setPriceBand('')
    setDifficulty('')
  }

  const selectClass =
    'h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none'

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
            <span className="text-sm text-muted-foreground">{results.length} results</span>
          </div>

          <div
            className={cn(
              'mt-4 flex-col gap-5 rounded-2xl border border-border bg-card p-5 lg:mt-0 lg:flex',
              showFilters ? 'flex' : 'hidden',
            )}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-secondary">Filters</h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <X className="size-3.5" aria-hidden /> Clear
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-destination" className="text-xs font-semibold text-secondary">Destination</label>
              <select id="f-destination" className={selectClass} value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">All destinations</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-category" className="text-xs font-semibold text-secondary">Category</label>
              <select id="f-category" className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-duration" className="text-xs font-semibold text-secondary">Duration</label>
              <select id="f-duration" className={selectClass} value={duration} onChange={(e) => setDuration(e.target.value as Duration)}>
                <option value="">Any length</option>
                <option value="short">1–4 days</option>
                <option value="medium">5–7 days</option>
                <option value="long">8+ days</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-price" className="text-xs font-semibold text-secondary">Price range</label>
              <select id="f-price" className={selectClass} value={priceBand} onChange={(e) => setPriceBand(e.target.value)}>
                {priceBands.map((b) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-difficulty" className="text-xs font-semibold text-secondary">Difficulty</label>
              <select id="f-difficulty" className={selectClass} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Any difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Strenuous">Strenuous</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <label htmlFor="pkg-search" className="sr-only">Search packages</label>
              <input
                id="pkg-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search yatras..."
                className="h-11 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="pkg-sort" className="hidden text-sm text-muted-foreground sm:inline">Sort</label>
              <select id="pkg-sort" className={cn(selectClass, 'h-11 w-auto')} value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          <p className="mt-4 hidden text-sm text-muted-foreground lg:block">{results.length} packages found</p>

          {results.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-6" aria-hidden />
              </span>
              <p className="font-medium text-secondary">No packages match your filters</p>
              <p className="max-w-sm text-sm text-muted-foreground">Try widening your search or clearing some filters.</p>
              <button type="button" onClick={reset} className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
