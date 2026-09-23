import { createClient } from '@/lib/supabase/server'
import { packages as samplePackages } from '@/lib/data'
import type { Package } from '@/lib/types'

// A DB row: full Package object lives in `data`; a few columns are mirrored
// for querying and are treated as authoritative on read.
type PackageRow = {
  id: string
  slug: string
  name: string
  category: string | null
  base_price: number
  status: Package['status']
  featured: boolean
  sort_order: number
  data: Package
}

function rowToPackage(row: PackageRow): Package {
  const d = row.data ?? ({} as Package)
  return {
    ...d,
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category ?? d.category ?? 'Pilgrimage',
    basePrice: row.base_price ?? d.basePrice ?? 0,
    status: row.status,
    featured: row.featured,
    // Ensure collections always exist so detail/listing pages never crash.
    gallery: d.gallery ?? [],
    highlights: d.highlights ?? [],
    itinerary: d.itinerary ?? [],
    inclusions: d.inclusions ?? [],
    exclusions: d.exclusions ?? [],
    departures: d.departures ?? [],
    faqs: d.faqs ?? [],
    requiredDocuments: d.requiredDocuments ?? [],
  }
}

/**
 * Published packages for the public site. Falls back to the bundled sample
 * data if the database is unreachable or still empty (e.g. before seeding),
 * so the storefront never renders blank.
 */
export async function getPublishedPackages(): Promise<Package[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error || !data || data.length === 0) {
      return process.env.NODE_ENV === 'development' ? samplePackages : []
    }
    return (data as PackageRow[]).map(rowToPackage)
  } catch {
    return process.env.NODE_ENV === 'development' ? samplePackages : []
  }
}

/** A single published package by slug (public site). */
export async function getPublishedPackageBySlug(slug: string): Promise<Package | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error || !data) {
      return process.env.NODE_ENV === 'development'
        ? samplePackages.find((p) => p.slug === slug) ?? null
        : null
    }
    return rowToPackage(data as PackageRow)
  } catch {
    return process.env.NODE_ENV === 'development'
      ? samplePackages.find((p) => p.slug === slug) ?? null
      : null
  }
}

export async function getRelatedPublishedPackages(pkg: Package, limit = 3): Promise<Package[]> {
  const all = await getPublishedPackages()
  return all
    .filter((p) => p.slug !== pkg.slug && (p.category === pkg.category || p.destinationSlug === pkg.destinationSlug))
    .slice(0, limit)
}

/** ALL packages regardless of status — admin only. */
export async function getAllPackagesAdmin(): Promise<Package[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as PackageRow[]).map(rowToPackage)
}

export async function getPackageByIdAdmin(id: string): Promise<Package | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('packages').select('*').eq('id', id).maybeSingle()
  if (error || !data) return null
  return rowToPackage(data as PackageRow)
}
