'use client'

import { useState } from 'react'
import { Check, Send } from 'lucide-react'
import { submitEnquiry } from '@/app/actions/public'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const res = await submitEnquiry({
      source: 'contact',
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      details: form.subject ? { subject: form.subject } : {},
    })
    setPending(false)
    if (res.ok) setSent(true)
    else setError(res.error ?? 'Something went wrong. Please try again.')
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-7 text-primary" aria-hidden />
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">Message received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {form.name || 'traveller'}. Our team will get back to you within one working day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Name</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Phone</span>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          inputMode="numeric"
          className="input"
          placeholder="10-digit mobile"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input"
          placeholder="you@example.com"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Subject</span>
        <input
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="input"
          placeholder="How can we help?"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="input min-h-32"
          placeholder="Tell us about your travel plans…"
        />
      </label>
      <div className="sm:col-span-2">
        {error && <p role="alert" className="mb-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden />
          {pending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
