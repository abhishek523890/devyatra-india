import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Package, CalendarCheck, MessageSquare, Plus, Database, AlertTriangle } from 'lucide-react'

async function safeCount(table: string, filter?: (q: any) => any) {
  const supabase = await createClient()
  let query = supabase.from(table).select('*', { count: 'exact', head: true })
  if (filter) query = filter(query)
  const { count, error } = await query
  if (error) return { count: null as number | null, error }
  return { count: count ?? 0, error: null }
}

export default async function AdminDashboardPage() {
  const packagesTotal = await safeCount('packages')

  // If the very first query errors, the schema likely isn't applied yet.
  if (packagesTotal.error) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-semibold text-secondary">Dashboard</h1>
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
            <div>
              <h2 className="font-semibold text-amber-900">Finish the one-time database setup</h2>
              <p className="mt-1 text-sm text-amber-800">
                Your admin login works, but the database tables have not been created yet. Open the Supabase SQL
                Editor, paste the contents of{' '}
                <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">scripts/001_admin_schema.sql</code>{' '}
                and click Run. Then refresh this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const [published, bookingsTotal, bookingsPending, enquiriesTotal, enquiriesNew] = await Promise.all([
    safeCount('packages', (q) => q.eq('status', 'published')),
    safeCount('bookings'),
    safeCount('bookings', (q) => q.eq('status', 'pending')),
    safeCount('enquiries'),
    safeCount('enquiries', (q) => q.eq('status', 'new')),
  ])

  const stats = [
    { label: 'Packages', value: packagesTotal.count, sub: `${published.count ?? 0} published`, icon: Package, href: '/admin/packages' },
    { label: 'Bookings', value: bookingsTotal.count, sub: `${bookingsPending.count ?? 0} pending`, icon: CalendarCheck, href: '/admin/bookings' },
    { label: 'Enquiries', value: enquiriesTotal.count, sub: `${enquiriesNew.count ?? 0} new`, icon: MessageSquare, href: '/admin/enquiries' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-secondary">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your pilgrimage packages, bookings and enquiries.</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" aria-hidden />
          Add package
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
              <s.icon className="size-5 text-primary" aria-hidden />
            </div>
            <p className="mt-3 font-serif text-3xl font-semibold text-secondary">{s.value ?? '—'}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Database className="size-5 text-primary" aria-hidden />
          <h2 className="font-serif text-lg font-semibold text-secondary">Quick guide</h2>
        </div>
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
          <li><strong className="text-secondary">Packages</strong> — add, edit, publish or unpublish tours shown on your website.</li>
          <li><strong className="text-secondary">Bookings</strong> — booking requests submitted from the website.</li>
          <li><strong className="text-secondary">Enquiries</strong> — messages from the contact, custom tour and Char Dham forms.</li>
          <li><strong className="text-secondary">Site Details</strong> — edit your address, phone numbers and registrations shown across the site.</li>
        </ul>
      </div>
    </div>
  )
}
