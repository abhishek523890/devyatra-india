'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { destinations } from '@/lib/data'
import { submitEnquiry } from '@/app/actions/public'

export function CustomTourForm() {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travellers: '2',
    duration: '',
    budget: '',
    month: '',
    picks: [] as string[],
    notes: '',
  })

  function togglePick(slug: string) {
    setForm((f) => ({
      ...f,
      picks: f.picks.includes(slug) ? f.picks.filter((p) => p !== slug) : [...f.picks, slug],
    }))
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-7 text-primary" aria-hidden />
        </div>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Our journey designers will craft a personalised itinerary and reach out to {form.email || 'you'} shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setPending(true)
        setError(null)
        const pickNames = form.picks
          .map((slug) => destinations.find((d) => d.slug === slug)?.name ?? slug)
          .join(', ')
        const res = await submitEnquiry({
          source: 'custom_tour',
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.notes,
          details: {
            travellers: form.travellers,
            duration_days: form.duration,
            budget: form.budget,
            preferred_month: form.month,
            destinations: pickNames || '—',
          },
        })
        setPending(false)
        if (res.ok) setSent(true)
        else setError(res.error ?? 'Something went wrong. Please try again.')
      }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Name</span>
          <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Phone</span>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
            inputMode="numeric"
            className="input"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
          <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Travellers</span>
          <input value={form.travellers} onChange={(e) => setForm((f) => ({ ...f, travellers: e.target.value }))} className="input" inputMode="numeric" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Duration (days)</span>
          <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} className="input" placeholder="e.g. 7" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Approx budget (per person)</span>
          <input value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} className="input" placeholder="e.g. ₹25,000" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Preferred month</span>
          <input value={form.month} onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))} className="input" placeholder="e.g. October" />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-foreground">Destinations you&apos;d like to include</legend>
        <div className="flex flex-wrap gap-2">
          {destinations.map((d) => {
            const active = form.picks.includes(d.slug)
            return (
              <button
                type="button"
                key={d.slug}
                onClick={() => togglePick(d.slug)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary'
                }`}
              >
                {d.name}
              </button>
            )
          })}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Anything else?</span>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className="input min-h-28"
          placeholder="Special occasions, accessibility needs, pace preferences…"
        />
      </label>

      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Sparkles className="size-4" aria-hidden />
        {pending ? 'Sending…' : 'Request my itinerary'}
      </button>
    </form>
  )
}
