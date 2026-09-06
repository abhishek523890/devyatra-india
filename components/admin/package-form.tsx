'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Save } from 'lucide-react'
import type { Package } from '@/lib/types'
import type { PackageFormState } from '@/app/admin/(dashboard)/packages/actions'
import { destinations } from '@/lib/data'

const difficulties = ['Easy', 'Moderate', 'Challenging', 'Strenuous'] as const
const statuses: { value: Package['status']; label: string }[] = [
  { value: 'draft', label: 'Draft (hidden)' },
  { value: 'published', label: 'Published (live)' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'sold_out', label: 'Sold out' },
]

type ItineraryItem = { title: string; description: string }
type DepartureItem = { date: string; totalSeats: number; availableSeats: number }
type FaqItem = { question: string; answer: string }

type Action = (state: PackageFormState, formData: FormData) => Promise<PackageFormState>

export function PackageForm({ action, initial }: { action: Action; initial?: Package }) {
  const [state, formAction, pending] = useActionState<PackageFormState, FormData>(action, undefined)

  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    initial?.itinerary?.map((d) => ({ title: d.title, description: d.description })) ?? [],
  )
  const [departures, setDepartures] = useState<DepartureItem[]>(
    initial?.departures?.map((d) => ({ date: d.date, totalSeats: d.totalSeats, availableSeats: d.availableSeats })) ??
      [],
  )
  const [faqs, setFaqs] = useState<FaqItem[]>(
    initial?.faqs?.map((f) => ({ question: f.question, answer: f.answer })) ?? [],
  )

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {/* Hidden serialized repeaters */}
      <input type="hidden" name="itinerary" value={JSON.stringify(itinerary)} />
      <input type="hidden" name="departures" value={JSON.stringify(departures)} />
      <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />

      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Section title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Package name" required className="sm:col-span-2">
            <input name="name" required defaultValue={initial?.name} className="input" placeholder="Char Dham Yatra — Complete Circuit" />
          </Field>
          <Field label="URL slug" hint="Leave blank to auto-generate from the name.">
            <input name="slug" defaultValue={initial?.slug} className="input" placeholder="char-dham-yatra" />
          </Field>
          <Field label="Category">
            <input name="category" defaultValue={initial?.category} className="input" placeholder="Char Dham" list="category-list" />
          </Field>
          <Field label="Short description" required className="sm:col-span-2">
            <textarea name="shortDescription" required defaultValue={initial?.shortDescription} rows={2} className="textarea" placeholder="One or two sentences shown on cards." />
          </Field>
          <Field label="Detailed description" className="sm:col-span-2">
            <textarea name="detailedDescription" defaultValue={initial?.detailedDescription} rows={4} className="textarea" placeholder="Full description shown on the package page." />
          </Field>
        </div>
      </Section>

      <Section title="Route & duration">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Destination">
            <select name="destinationSlug" defaultValue={initial?.destinationSlug ?? ''} className="input">
              <option value="">— None —</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>{d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Days">
            <input name="days" type="number" min={1} defaultValue={initial?.days ?? 1} className="input" />
          </Field>
          <Field label="Nights">
            <input name="nights" type="number" min={0} defaultValue={initial?.nights ?? 0} className="input" />
          </Field>
          <Field label="Difficulty">
            <select name="difficulty" defaultValue={initial?.difficulty ?? 'Moderate'} className="input">
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Start location">
            <input name="startLocation" defaultValue={initial?.startLocation} className="input" placeholder="Haridwar" />
          </Field>
          <Field label="End location">
            <input name="endLocation" defaultValue={initial?.endLocation} className="input" placeholder="Haridwar" />
          </Field>
          <Field label="Best season" className="lg:col-span-2">
            <input name="bestSeason" defaultValue={initial?.bestSeason} className="input" placeholder="May – June, Sep – Oct" />
          </Field>
        </div>
      </Section>

      <Section title="Pricing (INR)">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Base price / adult" required>
            <input name="basePrice" type="number" min={0} required defaultValue={initial?.basePrice ?? 0} className="input" />
          </Field>
          <Field label="Discounted price / adult" hint="Leave 0 to use base price.">
            <input name="discountedPrice" type="number" min={0} defaultValue={initial?.discountedPrice ?? 0} className="input" />
          </Field>
          <Field label="Child price">
            <input name="childPrice" type="number" min={0} defaultValue={initial?.childPrice ?? 0} className="input" />
          </Field>
          <Field label="Single supplement">
            <input name="singleSupplement" type="number" min={0} defaultValue={initial?.singleSupplement ?? 0} className="input" />
          </Field>
          <Field label="Tax %">
            <input name="taxPercent" type="number" min={0} defaultValue={initial?.taxPercent ?? 5} className="input" />
          </Field>
          <Field label="Max group size">
            <input name="maxGroupSize" type="number" min={1} defaultValue={initial?.maxGroupSize ?? 20} className="input" />
          </Field>
        </div>
      </Section>

      <Section title="Media">
        <div className="grid gap-4">
          <Field label="Cover image URL" hint="Path like /images/kedarnath.png or a full URL.">
            <input name="coverImage" defaultValue={initial?.coverImage} className="input" placeholder="/images/kedarnath.png" />
          </Field>
          <Field label="Gallery image URLs" hint="One URL per line.">
            <textarea name="gallery" defaultValue={initial?.gallery?.join('\n')} rows={3} className="textarea" placeholder={'/images/one.png\n/images/two.png'} />
          </Field>
        </div>
      </Section>

      <Section title="Highlights, inclusions & exclusions">
        <div className="grid gap-4 lg:grid-cols-3">
          <Field label="Highlights" hint="One per line.">
            <textarea name="highlights" defaultValue={initial?.highlights?.join('\n')} rows={6} className="textarea" />
          </Field>
          <Field label="Inclusions" hint="One per line.">
            <textarea name="inclusions" defaultValue={initial?.inclusions?.join('\n')} rows={6} className="textarea" />
          </Field>
          <Field label="Exclusions" hint="One per line.">
            <textarea name="exclusions" defaultValue={initial?.exclusions?.join('\n')} rows={6} className="textarea" />
          </Field>
        </div>
      </Section>

      <Section title="Itinerary">
        <div className="flex flex-col gap-3">
          {itinerary.map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-secondary">Day {i + 1}</span>
                <button type="button" onClick={() => setItinerary((prev) => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive" aria-label={`Remove day ${i + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <input
                value={item.title}
                onChange={(e) => setItinerary((prev) => prev.map((it, idx) => (idx === i ? { ...it, title: e.target.value } : it)))}
                className="input mb-2"
                placeholder="Day title"
              />
              <textarea
                value={item.description}
                onChange={(e) => setItinerary((prev) => prev.map((it, idx) => (idx === i ? { ...it, description: e.target.value } : it)))}
                rows={2}
                className="textarea"
                placeholder="What happens on this day"
              />
            </div>
          ))}
          <AddButton onClick={() => setItinerary((prev) => [...prev, { title: '', description: '' }])} label="Add day" />
        </div>
      </Section>

      <Section title="Departure dates">
        <div className="flex flex-col gap-3">
          {departures.map((d, i) => (
            <div key={i} className="grid items-end gap-3 rounded-xl border border-border bg-muted/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <Field label="Date">
                <input type="date" value={d.date} onChange={(e) => setDepartures((prev) => prev.map((it, idx) => (idx === i ? { ...it, date: e.target.value } : it)))} className="input" />
              </Field>
              <Field label="Total seats">
                <input type="number" min={0} value={d.totalSeats} onChange={(e) => setDepartures((prev) => prev.map((it, idx) => (idx === i ? { ...it, totalSeats: Number(e.target.value) } : it)))} className="input" />
              </Field>
              <Field label="Available seats">
                <input type="number" min={0} value={d.availableSeats} onChange={(e) => setDepartures((prev) => prev.map((it, idx) => (idx === i ? { ...it, availableSeats: Number(e.target.value) } : it)))} className="input" />
              </Field>
              <button type="button" onClick={() => setDepartures((prev) => prev.filter((_, idx) => idx !== i))} className="mb-2.5 inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Remove departure">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <AddButton onClick={() => setDepartures((prev) => [...prev, { date: '', totalSeats: 20, availableSeats: 20 }])} label="Add departure" />
        </div>
      </Section>

      <Section title="Logistics">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Accommodation">
            <input name="accommodation" defaultValue={initial?.accommodation} className="input" placeholder="3-star hotels & guesthouses" />
          </Field>
          <Field label="Transportation">
            <input name="transportation" defaultValue={initial?.transportation} className="input" placeholder="AC vehicle" />
          </Field>
          <Field label="Meals included">
            <input name="mealsIncluded" defaultValue={initial?.mealsIncluded} className="input" placeholder="Breakfast & dinner" />
          </Field>
          <Field label="Required documents" hint="One per line." className="sm:col-span-2">
            <textarea name="requiredDocuments" defaultValue={initial?.requiredDocuments?.join('\n')} rows={3} className="textarea" />
          </Field>
          <Field label="Health info">
            <textarea name="healthInfo" defaultValue={initial?.healthInfo} rows={3} className="textarea" />
          </Field>
        </div>
      </Section>

      <Section title="FAQs">
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-secondary">Question {i + 1}</span>
                <button type="button" onClick={() => setFaqs((prev) => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive" aria-label={`Remove question ${i + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <input value={f.question} onChange={(e) => setFaqs((prev) => prev.map((it, idx) => (idx === i ? { ...it, question: e.target.value } : it)))} className="input mb-2" placeholder="Question" />
              <textarea value={f.answer} onChange={(e) => setFaqs((prev) => prev.map((it, idx) => (idx === i ? { ...it, answer: e.target.value } : it)))} rows={2} className="textarea" placeholder="Answer" />
            </div>
          ))}
          <AddButton onClick={() => setFaqs((prev) => [...prev, { question: '', answer: '' }])} label="Add FAQ" />
        </div>
      </Section>

      <Section title="Visibility">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Status">
            <select name="status" defaultValue={initial?.status ?? 'draft'} className="input">
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Sort order" hint="Lower shows first.">
            <input name="sortOrder" type="number" defaultValue={0} className="input" />
          </Field>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm font-medium text-secondary">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured} className="size-4 rounded border-border text-primary focus:ring-ring" />
            Featured package
          </label>
        </div>
      </Section>

      <datalist id="category-list">
        <option value="Char Dham" />
        <option value="Do Dham" />
        <option value="Ek Dham" />
        <option value="Jyotirlinga" />
        <option value="Shakti Peeth" />
        <option value="Spiritual City" />
      </datalist>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-3 border-t border-border bg-card/95 px-4 py-4 backdrop-blur sm:-mx-6">
        <Link href="/admin/packages" className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-secondary">
          Cancel
        </Link>
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          <Save className="size-4" aria-hidden />
          {pending ? 'Saving…' : initial ? 'Save changes' : 'Create package'}
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="mb-4 font-serif text-lg font-semibold text-secondary">{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className="field-label">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-secondary hover:border-primary hover:text-primary"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  )
}
