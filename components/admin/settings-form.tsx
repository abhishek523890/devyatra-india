'use client'

import { useActionState, useState } from 'react'
import { Plus, Trash2, Save, CheckCircle2 } from 'lucide-react'
import { saveSettings, type SettingsState } from '@/app/admin/(dashboard)/manage-actions'
import type { SiteSettings } from '@/lib/settings'

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(saveSettings, undefined)
  const [phones, setPhones] = useState(initial.phones.map((p) => ({ display: p.display, tel: p.tel })))

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.success && (
        <p className="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 className="size-4" aria-hidden /> Saved. Your website has been updated.
        </p>
      )}
      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <Section title="Brand">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand name">
            <input name="brandName" defaultValue={initial.brandName} className="input" />
          </Field>
          <Field label="Legal / company name">
            <input name="legalName" defaultValue={initial.legalName} className="input" />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <input name="tagline" defaultValue={initial.tagline} className="input" />
          </Field>
        </div>
      </Section>

      <Section title="Phone numbers">
        <div className="flex flex-col gap-3">
          {phones.map((p, i) => (
            <div key={i} className="grid items-end gap-3 rounded-xl border border-border bg-muted/40 p-3 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Display" hint="Shown to visitors">
                <input name="phone_display" value={p.display} onChange={(e) => setPhones((prev) => prev.map((it, idx) => (idx === i ? { ...it, display: e.target.value } : it)))} className="input" placeholder="+91 70618 87271" />
              </Field>
              <Field label="Dial number" hint="Digits with country code">
                <input name="phone_tel" value={p.tel} onChange={(e) => setPhones((prev) => prev.map((it, idx) => (idx === i ? { ...it, tel: e.target.value } : it)))} className="input" placeholder="+917061887271" />
              </Field>
              <button type="button" onClick={() => setPhones((prev) => prev.filter((_, idx) => idx !== i))} className="mb-2.5 inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Remove phone">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setPhones((prev) => [...prev, { display: '', tel: '' }])} className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-secondary hover:border-primary hover:text-primary">
            <Plus className="size-4" aria-hidden /> Add phone
          </button>
          <p className="text-xs text-muted-foreground">The first number is used for the header and WhatsApp button. WhatsApp uses the dial number automatically.</p>
        </div>
      </Section>

      <Section title="Contact & address">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Public email" hint="Leave blank to hide it everywhere.">
            <input name="email" type="email" defaultValue={initial.email} className="input" placeholder="hello@example.com" />
          </Field>
          <Field label="Working hours">
            <input name="hours" defaultValue={initial.hours} className="input" />
          </Field>
          <Field label="Address lines" hint="One line per row." className="sm:col-span-2">
            <textarea name="addressLines" defaultValue={initial.address.lines.join('\n')} rows={4} className="textarea" />
          </Field>
          <Field label="Short address" hint="e.g. for meta tags" className="sm:col-span-2">
            <input name="addressShort" defaultValue={initial.address.short} className="input" />
          </Field>
        </div>
      </Section>

      <Section title="Registrations & WhatsApp">
        <div className="grid gap-4">
          <Field label="Registrations" hint="One per line.">
            <textarea name="registrations" defaultValue={initial.registrations.join('\n')} rows={3} className="textarea" />
          </Field>
          <Field label="WhatsApp prefilled message">
            <textarea name="whatsappMessage" defaultValue={initial.whatsappMessage} rows={2} className="textarea" />
          </Field>
        </div>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-3 border-t border-border bg-card/95 px-4 py-4 backdrop-blur sm:-mx-6">
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          <Save className="size-4" aria-hidden />
          {pending ? 'Saving…' : 'Save site details'}
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

function Field({ label, hint, className, children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="field-label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
