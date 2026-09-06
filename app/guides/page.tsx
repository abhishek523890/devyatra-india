import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Badge } from '@/components/ui/badge'
import { blogPosts } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Travel Guides',
  description:
    'Practical guides, tips and cultural notes to help you prepare for your pilgrimage across India.',
}

export default function GuidesPage() {
  const [feature, ...rest] = blogPosts

  return (
    <>
      <PageHero
        title="Travel guides & yatra tips"
        description="Everything from packing lists to the best weather windows, written to help you travel prepared and at peace."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Travel Guides' }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <Link
          href={`/guides/${feature.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] md:aspect-auto">
            <Image
              src={feature.image || '/placeholder.svg'}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 p-8">
            <Badge variant="gold" className="w-fit">
              {feature.category}
            </Badge>
            <h2 className="font-serif text-2xl font-semibold text-secondary md:text-3xl">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(feature.date)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                {feature.readTime}
              </span>
            </div>
            <span className="mt-2 inline-flex items-center gap-1 font-semibold text-primary">
              Read guide
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
        </Link>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/guides/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge variant="maroon" className="absolute top-3 left-3 bg-secondary/90 text-secondary-foreground">
                  {post.category}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-serif text-lg font-semibold text-secondary group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
