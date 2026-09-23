import type { MetadataRoute } from 'next'
import { getPublishedPackages } from '@/lib/packages'
import { destinations, blogPosts } from '@/lib/data'

const BASE_URL = 'https://sureshtourandtravel.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packages = await getPublishedPackages()
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/packages`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/custom-tour`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const packagePages: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${BASE_URL}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${BASE_URL}/destinations/${destination.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const guidePages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/guides/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...packagePages, ...destinationPages, ...guidePages]
}
