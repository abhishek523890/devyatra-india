// Domain types for DevYatra India.
// These mirror the intended Supabase tables so the UI can be wired to a real
// database later without restructuring components.

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous'
export type PackageStatus = 'draft' | 'published' | 'inactive' | 'sold_out'

export interface Departure {
  id: string
  date: string // ISO date
  totalSeats: number
  availableSeats: number
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Package {
  id: string
  slug: string
  name: string
  shortDescription: string
  detailedDescription: string
  destinationSlug: string
  category: string
  days: number
  nights: number
  startLocation: string
  endLocation: string
  basePrice: number // per adult, in INR
  discountedPrice: number // per adult, in INR
  childPrice: number
  singleSupplement: number
  taxPercent: number
  maxGroupSize: number
  difficulty: Difficulty
  bestSeason: string
  coverImage: string
  gallery: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  accommodation: string
  transportation: string
  mealsIncluded: string
  requiredDocuments: string[]
  healthInfo: string
  status: PackageStatus
  featured: boolean
  departures: Departure[]
  faqs: { question: string; answer: string }[]
}

export interface Destination {
  slug: string
  name: string
  state: string
  region: string
  tagline: string
  description: string
  image: string
  bestTime: string
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  packageName: string
  quote: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  content: string[]
}
