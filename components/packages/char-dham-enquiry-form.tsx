'use client'

import { useState } from 'react'
import { Check, Send, Phone, MessageCircle } from 'lucide-react'

const PHONE_PRIMARY = '917061887271'
const PHONE_SECONDARY = '919084477271'

export function CharDhamEnquiryForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    travellers: '',
    date: '',
    message: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // Demo only — a production build would POST this enquiry to a server action
    // that stores it and notifies Parth Sarthi Holidays.
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-7 text-primary" aria-hidden />
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">Enquiry received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {form.name || 'traveller'}. Our team at Parth Sarthi Holidays will call you back shortly to plan
          your Char Dham Yatra.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`tel:+${PHONE_PRIMARY}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" aria-hidden />
            Call now
          </a>
          <a
            href={`https://wa.me/${PHONE_PRIMARY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
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
        <span className="mb-1.5 block text-sm font-medium text-foreground">Phone number</span>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          inputMode="numeric"
          className="input"
          placeholder="10-digit mobile"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Number of travellers</span>
        <input
          required
          value={form.travellers}
          onChange={(e) => setForm((f) => ({ ...f, travellers: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
          inputMode="numeric"
          className="input"
          placeholder="e.g. 4"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Preferred travel date</span>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="input"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="input min-h-28"
          placeholder="Tell us about your group and any special requirements…"
        />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="size-4" aria-hidden />
          Submit enquiry
        </button>
        <div className="flex gap-3">
          <a
            href={`tel:+${PHONE_PRIMARY}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Phone className="size-4" aria-hidden />
            Call now
          </a>
          <a
            href={`https://wa.me/${PHONE_PRIMARY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </form>
  )
}

export { PHONE_PRIMARY, PHONE_SECONDARY }
