'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Package, Difficulty, PackageStatus, ItineraryDay, Departure } from '@/lib/types'

export type PackageFormState = { error?: string } | undefined

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseJson<T>(v: FormDataEntryValue | null, fallback: T): T {
  try {
    const parsed = JSON.parse(String(v ?? ''))
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

/** Builds the full Package `data` object + top-level columns from the form. */
function buildPackage(formData: FormData, id: string, slug: string): {
  columns: Record<string, unknown>
  data: Package
} {
  const name = String(formData.get('name') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim() || 'Pilgrimage'
  const status = (String(formData.get('status') ?? 'draft') as PackageStatus) || 'draft'
  const featured = formData.get('featured') === 'on'
  const basePrice = num(formData.get('basePrice'))

  const rawItinerary = parseJson<{ title: string; description: string }[]>(formData.get('itinerary'), [])
  const itinerary: ItineraryDay[] = rawItinerary
    .filter((d) => d.title?.trim() || d.description?.trim())
    .map((d, i) => ({ day: i + 1, title: d.title?.trim() ?? '', description: d.description?.trim() ?? '' }))

  const rawDepartures = parseJson<{ date: string; totalSeats: number; availableSeats: number }[]>(
    formData.get('departures'),
    [],
  )
  const departures: Departure[] = rawDepartures
    .filter((d) => d.date)
    .map((d, i) => ({
      id: `${slug}-dep-${i + 1}`,
      date: d.date,
      totalSeats: Number(d.totalSeats) || 0,
      availableSeats: Number(d.availableSeats) || 0,
    }))

  const rawFaqs = parseJson<{ question: string; answer: string }[]>(formData.get('faqs'), [])
  const faqs = rawFaqs.filter((f) => f.question?.trim() || f.answer?.trim())

  const discountedPrice = num(formData.get('discountedPrice'), basePrice)

  const data: Package = {
    id,
    slug,
    name,
    shortDescription: String(formData.get('shortDescription') ?? '').trim(),
    detailedDescription: String(formData.get('detailedDescription') ?? '').trim(),
    destinationSlug: String(formData.get('destinationSlug') ?? '').trim(),
    category,
    days: num(formData.get('days'), 1),
    nights: num(formData.get('nights'), 0),
    startLocation: String(formData.get('startLocation') ?? '').trim(),
    endLocation: String(formData.get('endLocation') ?? '').trim(),
    basePrice,
    discountedPrice: discountedPrice > 0 ? discountedPrice : basePrice,
    childPrice: num(formData.get('childPrice')),
    singleSupplement: num(formData.get('singleSupplement')),
    taxPercent: num(formData.get('taxPercent'), 5),
    maxGroupSize: num(formData.get('maxGroupSize'), 20),
    difficulty: (String(formData.get('difficulty') ?? 'Moderate') as Difficulty) || 'Moderate',
    bestSeason: String(formData.get('bestSeason') ?? '').trim(),
    coverImage: String(formData.get('coverImage') ?? '').trim() || '/placeholder.svg',
    gallery: lines(formData.get('gallery')),
    highlights: lines(formData.get('highlights')),
    itinerary,
    inclusions: lines(formData.get('inclusions')),
    exclusions: lines(formData.get('exclusions')),
    accommodation: String(formData.get('accommodation') ?? '').trim(),
    transportation: String(formData.get('transportation') ?? '').trim(),
    mealsIncluded: String(formData.get('mealsIncluded') ?? '').trim(),
    requiredDocuments: lines(formData.get('requiredDocuments')),
    healthInfo: String(formData.get('healthInfo') ?? '').trim(),
    status,
    featured,
    departures,
    faqs,
  }

  const columns = {
    slug,
    name,
    category,
    base_price: basePrice,
    status,
    featured,
    sort_order: num(formData.get('sortOrder')),
    data,
  }

  return { columns, data }
}

export async function createPackage(_prev: PackageFormState, formData: FormData): Promise<PackageFormState> {
  await requireAdmin()

  const name = String(formData.get('name') ?? '').trim()
  if (!name) return { error: 'Package name is required.' }

  const slug = slugify(String(formData.get('slug') ?? '').trim() || name)
  if (!slug) return { error: 'Could not derive a valid URL slug from the name.' }

  const id =
    globalThis.crypto?.randomUUID?.() ?? `pkg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const { columns } = buildPackage(formData, id, slug)

  const supabase = await createClient()
  const { error } = await supabase.from('packages').insert(columns)
  if (error) {
    if (error.code === '23505') return { error: `The URL slug "${slug}" is already in use. Choose another.` }
    return { error: error.message }
  }

  revalidatePath('/admin/packages')
  revalidatePath('/packages')
  redirect('/admin/packages')
}

export async function updatePackage(
  id: string,
  _prev: PackageFormState,
  formData: FormData,
): Promise<PackageFormState> {
  await requireAdmin()

  const name = String(formData.get('name') ?? '').trim()
  if (!name) return { error: 'Package name is required.' }

  const slug = slugify(String(formData.get('slug') ?? '').trim() || name)
  if (!slug) return { error: 'Could not derive a valid URL slug from the name.' }

  const { columns, data } = buildPackage(formData, id, slug)

  const supabase = await createClient()
  const { error } = await supabase.from('packages').update({ ...columns, data }).eq('id', id)
  if (error) {
    if (error.code === '23505') return { error: `The URL slug "${slug}" is already in use. Choose another.` }
    return { error: error.message }
  }

  revalidatePath('/admin/packages')
  revalidatePath('/packages')
  revalidatePath(`/packages/${slug}`)
  redirect('/admin/packages')
}

export async function deletePackage(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createClient()
  await supabase.from('packages').delete().eq('id', id)

  revalidatePath('/admin/packages')
  revalidatePath('/packages')
}
