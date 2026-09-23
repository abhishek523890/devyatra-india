import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { faqs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about booking, payments, cancellations, fitness and travel with Suresh Tour and Travels.',
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently asked questions"
        description="Everything you need to know before you book your pilgrimage. Can't find your answer? Reach out any time."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'FAQ' }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <FaqAccordion items={faqs} />

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">Still have a question?</p>
          <Link
            href="/contact"
            className="mt-3 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </>
  )
}
