'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check, ChevronLeft, ShieldCheck, CalendarDays, Users, CircleAlert } from 'lucide-react'
import { getPackageBySlug } from '@/lib/data'
import { calculatePrice, formatINR, formatDate, generateBookingRef } from '@/lib/format'

type Step = 0 | 1 | 2 | 3

interface Traveller {
  fullName: string
  age: string
  gender: string
  idType: string
  idNumber: string
}

const STEPS = ['Travellers', 'Review', 'Payment', 'Confirmed']

function emptyTraveller(): Traveller {
  return { fullName: '', age: '', gender: '', idType: 'Aadhaar', idNumber: '' }
}

export function BookingFlow() {
  const search = useSearchParams()
  const pkg = getPackageBySlug(search.get('package') ?? '')
  const departureId = search.get('departure') ?? ''
  const adults = Math.max(1, Number(search.get('adults') ?? 1))
  const children = Math.max(0, Number(search.get('children') ?? 0))
  const rooms = Math.max(0, Number(search.get('rooms') ?? 0))

  const [step, setStep] = useState<Step>(0)
  const [travellers, setTravellers] = useState<Traveller[]>(() =>
    Array.from({ length: adults + children }, emptyTraveller),
  )
  const [contact, setContact] = useState({ email: '', phone: '', address: '', notes: '' })
  const [agree, setAgree] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [bookingRef] = useState(() => generateBookingRef())
  const [errors, setErrors] = useState<string[]>([])

  const departure = pkg?.departures.find((d) => d.id === departureId) ?? pkg?.departures[0]

  const price = useMemo(() => {
    if (!pkg) return null
    return calculatePrice({
      perAdult: pkg.discountedPrice,
      perChild: pkg.childPrice,
      singleSupplement: pkg.singleSupplement,
      taxPercent: pkg.taxPercent,
      adults,
      children,
      singleRooms: rooms,
    })
  }, [pkg, adults, children, rooms])

  if (!pkg || !price) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="font-serif text-2xl font-semibold text-foreground">Booking session not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t find the package for this booking. Please choose a package to begin.
        </p>
        <Link
          href="/packages"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Browse packages
        </Link>
      </div>
    )
  }

  function updateTraveller(i: number, patch: Partial<Traveller>) {
    setTravellers((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)))
  }

  function validateTravellers() {
    const errs: string[] = []
    travellers.forEach((t, i) => {
      if (!t.fullName.trim()) errs.push(`Traveller ${i + 1}: full name is required`)
      if (!t.age.trim()) errs.push(`Traveller ${i + 1}: age is required`)
    })
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) errs.push('A valid email address is required')
    if (!/^[0-9]{10}$/.test(contact.phone)) errs.push('A valid 10-digit phone number is required')
    setErrors(errs)
    return errs.length === 0
  }

  function next() {
    if (step === 0 && !validateTravellers()) return
    if (step === 2) {
      setProcessing(true)
      // Simulated payment — a real integration would create a server-side
      // order and confirm via a payment webhook.
      setTimeout(() => {
        setProcessing(false)
        setStep(3)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1600)
      return
    }
    setErrors([])
    setStep((s) => (Math.min(3, s + 1) as Step))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <ol className="mb-10 flex items-center justify-between gap-2">
        {STEPS.map((label, i) => {
          const done = i < step
          const active = i === step
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-8 items-center justify-center rounded-full border text-sm font-semibold ${
                    done
                      ? 'border-primary bg-primary text-primary-foreground'
                      : active
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground'
                  }`}
                >
                  {done ? <Check className="size-4" aria-hidden /> : i + 1}
                </span>
                <span
                  className={`hidden text-sm font-medium sm:inline ${active || done ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && <span className={`h-px flex-1 ${done ? 'bg-primary' : 'bg-border'}`} aria-hidden />}
            </li>
          )
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {errors.length > 0 && (
            <div className="mb-6 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
              <ul className="space-y-1">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {step === 0 && (
            <section className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Traveller details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter details exactly as they appear on the government ID each traveller will carry.
                </p>
              </div>
              {travellers.map((t, i) => (
                <fieldset key={i} className="rounded-2xl border border-border bg-card p-5">
                  <legend className="px-2 text-sm font-semibold text-primary">
                    {i < adults ? `Adult ${i + 1}` : `Child ${i - adults + 1}`}
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        value={t.fullName}
                        onChange={(e) => updateTraveller(i, { fullName: e.target.value })}
                        className="input"
                        placeholder="As per ID"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Age" required>
                        <input
                          value={t.age}
                          onChange={(e) => updateTraveller(i, { age: e.target.value.replace(/\D/g, '') })}
                          className="input"
                          inputMode="numeric"
                          placeholder="e.g. 34"
                        />
                      </Field>
                      <Field label="Gender">
                        <select
                          value={t.gender}
                          onChange={(e) => updateTraveller(i, { gender: e.target.value })}
                          className="input"
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="ID type">
                      <select
                        value={t.idType}
                        onChange={(e) => updateTraveller(i, { idType: e.target.value })}
                        className="input"
                      >
                        <option>Aadhaar</option>
                        <option>Passport</option>
                        <option>Voter ID</option>
                        <option>Driving Licence</option>
                      </select>
                    </Field>
                    <Field label="ID number">
                      <input
                        value={t.idNumber}
                        onChange={(e) => updateTraveller(i, { idNumber: e.target.value })}
                        className="input"
                        placeholder="Optional at this stage"
                      />
                    </Field>
                  </div>
                </fieldset>
              ))}

              <fieldset className="rounded-2xl border border-border bg-card p-5">
                <legend className="px-2 text-sm font-semibold text-primary">Contact & lead traveller</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" required>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      className="input"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      className="input"
                      inputMode="numeric"
                      placeholder="10-digit mobile"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Address">
                      <input
                        value={contact.address}
                        onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                        className="input"
                        placeholder="City, State"
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Special requests">
                      <textarea
                        value={contact.notes}
                        onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                        className="input min-h-24"
                        placeholder="Dietary needs, mobility assistance, room preferences…"
                      />
                    </Field>
                  </div>
                </div>
              </fieldset>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Review your booking</h2>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">Travellers</h3>
                <ul className="mt-3 divide-y divide-border text-sm">
                  {travellers.map((t, i) => (
                    <li key={i} className="flex items-center justify-between py-2">
                      <span className="text-foreground">{t.fullName || `Traveller ${i + 1}`}</span>
                      <span className="text-muted-foreground">
                        {i < adults ? 'Adult' : 'Child'}
                        {t.age ? ` · ${t.age} yrs` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-sm">
                <h3 className="font-semibold text-foreground">Contact</h3>
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="text-foreground">{contact.email || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="text-foreground">{contact.phone || '—'}</dd>
                  </div>
                  {contact.notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-muted-foreground">Special requests</dt>
                      <dd className="text-foreground">{contact.notes}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 size-4 accent-[var(--color-primary)]"
                />
                <span className="text-muted-foreground">
                  I have read and accept the{' '}
                  <Link href="/terms" className="font-medium text-primary hover:underline">
                    terms &amp; conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/cancellation-policy" className="font-medium text-primary hover:underline">
                    cancellation policy
                  </Link>
                  .
                </span>
              </label>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Payment</h2>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pay 25% advance now</span>
                  <span className="font-serif text-2xl font-semibold text-secondary">{formatINR(price.advance)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Balance of {formatINR(price.remaining)} is payable before departure.
                </p>
              </div>
              <div className="flex gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold-foreground" aria-hidden />
                <p>
                  This is a demonstration checkout. No real payment gateway is connected, so no money will be charged.
                  Clicking below simulates a successful advance payment.
                </p>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-8 text-primary" aria-hidden />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">Booking confirmed</h2>
              <p className="mt-2 text-muted-foreground">
                Thank you, your seat is reserved. A confirmation has been sent to{' '}
                <span className="font-medium text-foreground">{contact.email || 'your email'}</span>.
              </p>
              <div className="mx-auto mt-6 max-w-xs rounded-xl border border-dashed border-border bg-muted/40 p-4">
                <span className="text-xs text-muted-foreground">Booking reference</span>
                <p className="font-mono text-lg font-semibold text-secondary">{bookingRef}</p>
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/packages"
                  className="rounded-full border border-border bg-card px-6 py-3 font-semibold text-foreground hover:bg-muted"
                >
                  Explore more journeys
                </Link>
                <Link
                  href="/"
                  className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
                >
                  Back to home
                </Link>
              </div>
            </section>
          )}

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  onClick={() => {
                    setErrors([])
                    setStep((s) => Math.max(0, s - 1) as Step)
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-5 py-3 font-semibold text-foreground hover:bg-muted"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Back
                </button>
              ) : (
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-5 py-3 font-semibold text-foreground hover:bg-muted"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Cancel
                </Link>
              )}
              <button
                onClick={next}
                disabled={(step === 1 && !agree) || processing}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing
                  ? 'Processing…'
                  : step === 0
                    ? 'Continue to review'
                    : step === 1
                      ? 'Proceed to payment'
                      : `Pay ${formatINR(price.advance)}`}
              </button>
            </div>
          )}
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-[16/9]">
              <Image src={pkg.coverImage || '/placeholder.svg'} alt={pkg.name} fill sizes="360px" className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-secondary">{pkg.name}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" aria-hidden />
                  {departure ? formatDate(departure.date) : 'Flexible date'} · {pkg.days}D/{pkg.nights}N
                </li>
                <li className="flex items-center gap-2">
                  <Users className="size-4 text-primary" aria-hidden />
                  {adults} adult{adults > 1 ? 's' : ''}
                  {children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}
                  {rooms > 0 ? `, ${rooms} single room${rooms > 1 ? 's' : ''}` : ''}
                </li>
              </ul>

              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <Row label={`Adults (${price.adults})`} value={formatINR(price.adultTotal)} />
                {price.childTotal > 0 && <Row label={`Children (${price.children})`} value={formatINR(price.childTotal)} />}
                {price.roomSupplement > 0 && <Row label="Single room supplement" value={formatINR(price.roomSupplement)} />}
                <Row label={`Taxes (${price.taxPercent}%)`} value={formatINR(price.tax)} />
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <dt className="font-serif text-base font-semibold text-foreground">Total</dt>
                  <dd className="font-serif text-lg font-semibold text-secondary">{formatINR(price.total)}</dd>
                </div>
                <Row label="Advance (25%)" value={formatINR(price.advance)} muted />
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
    </label>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? 'text-muted-foreground' : 'text-foreground'}>{label}</dt>
      <dd className={muted ? 'text-muted-foreground' : 'text-foreground'}>{value}</dd>
    </div>
  )
}
