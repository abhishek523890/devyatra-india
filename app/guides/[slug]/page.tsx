import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getBlogBySlug, blogPosts } from '@/lib/data'
import { formatDate } from '@/lib/format'

const SITE_URL = 'https://sureshtourandtravel.com'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return { title: 'Guide Not Found', robots: { index: false, follow: false } }

  const title = `${post.title} | Suresh Tour and Travel`
  const description = post.excerpt
  const canonicalUrl = `${SITE_URL}/guides/${post.slug}`

  return {
    title,
    description,
    keywords: [post.title, post.category, 'pilgrimage travel guide', 'India yatra guide'],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Suresh Tour and Travel',
      locale: 'en_IN',
      publishedTime: post.date,
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    mainEntityOfPage: `${SITE_URL}/guides/${post.slug}`,
    image: post.image ? [post.image] : undefined,
    author: { '@type': 'Organization', name: 'Suresh Tour and Travel' },
    publisher: { '@type': 'Organization', name: 'Suresh Tour and Travel', url: SITE_URL },
  }

  return (
    <article className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative flex min-h-[46vh] items-end overflow-hidden pt-20">
        <Image src={post.image || '/placeholder.svg'} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/50 to-secondary/20" />
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 text-secondary-foreground">
          <Badge variant="gold" className="mb-3">{post.category}</Badge>
          <h1 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-secondary-foreground/80">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-4">
        <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
          {post.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <Link href="/guides" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            <ArrowLeft className="size-4" aria-hidden />
            All guides
          </Link>
          <Link href="/packages" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
            Browse yatras
          </Link>
        </div>
      </div>
    </article>
  )
}
