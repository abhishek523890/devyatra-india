import { PageHero } from '@/components/site/page-hero'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero title={title} breadcrumbs={[{ href: '/', label: 'Home' }, { label: title }]} />
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <p className="mb-8 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-xl font-semibold text-foreground">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          This is sample policy text provided for demonstration and does not constitute legal advice. Replace it with
          your reviewed policy before going live.
        </p>
      </article>
    </>
  )
}
