import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { PackagesExplorer } from '@/components/packages/packages-explorer'
import { getPublishedPackages } from '@/lib/packages'

export const metadata: Metadata = {
  title: 'All Pilgrimage Packages',
  description:
    'Browse and filter pilgrimage tour packages — Char Dham, Kedarnath, Badrinath, Vaishno Devi, Varanasi, Ayodhya, Amarnath and more.',
  alternates: { canonical: '/packages' },
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; category?: string; duration?: string }>
}) {
  const sp = await searchParams
  const allPackages = await getPublishedPackages()
  return (
    <>
      <PageHero
        title="Pilgrimage Packages"
        description="Curated group and private yatras across India's most sacred destinations. Filter by destination, category, duration and budget."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Packages' }]}
      />
      <PackagesExplorer
        allPackages={allPackages}
        initialDestination={sp.destination ?? ''}
        initialCategory={sp.category ?? ''}
        initialDuration={sp.duration ?? ''}
      />
    </>
  )
}
