'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Demo only — in production this posts to a Supabase-backed API route
    // that stores the address in newsletter_subscribers.
    setDone(true)
    setEmail('')
  }

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-medium">
        <Check className="size-4 text-primary" aria-hidden />
        Thanks! You&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-secondary-foreground placeholder:text-secondary-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Subscribe
      </button>
    </form>
  )
}
