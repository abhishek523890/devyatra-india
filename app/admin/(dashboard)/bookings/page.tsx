import { createClient } from '@/lib/supabase/server'
import { formatINR } from '@/lib/format'
import { AlertTriangle, CalendarCheck } from 'lucide-react'
import { updateBookingStatus, deleteBooking } from '../manage-actions'
import { StatusSelect } from '@/components/admin/status-select'
import { DeleteButton } from '@/components/admin/delete-button'

export const metadata = { title: 'Bookings' }

type Booking = {
  id: string
  reference: string
  package_name: string | null
  departure_label: string | null
  adults: number
  children: number
  rooms: number
  total_amount: number
  lead_name: string
  lead_email: string | null
  lead_phone: string | null
  status: string
  created_at: string
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminBookingsPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-secondary">Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Booking requests submitted from your website.</p>

      {error ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
          <span>
            Run <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">scripts/001_admin_schema.sql</code> in the Supabase SQL Editor, then refresh.
          </span>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <CalendarCheck className="size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">No bookings yet.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {(data as Booking[]).map((b) => (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{b.reference}</span>
                    <span className="text-xs text-muted-foreground">· {fmtDate(b.created_at)}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-semibold text-secondary">{b.package_name ?? 'Package'}</h2>
                  {b.departure_label && <p className="text-sm text-muted-foreground">Departure: {b.departure_label}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <StatusSelect action={updateBookingStatus} id={b.id} value={b.status} options={statusOptions} />
                  <DeleteButton action={deleteBooking} id={b.id} confirmText={`Delete booking ${b.reference}?`} />
                </div>
              </div>

              <div className="mt-4 grid gap-4 border-t border-border pt-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Lead traveller</p>
                  <p className="mt-1 font-medium text-secondary">{b.lead_name}</p>
                  {b.lead_phone && <a href={`tel:${b.lead_phone}`} className="block text-muted-foreground hover:text-primary">{b.lead_phone}</a>}
                  {b.lead_email && <a href={`mailto:${b.lead_email}`} className="block text-muted-foreground hover:text-primary">{b.lead_email}</a>}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Travellers</p>
                  <p className="mt-1 text-secondary">{b.adults} adult{b.adults !== 1 ? 's' : ''}{b.children ? `, ${b.children} child` : ''}{b.rooms ? `, ${b.rooms} room${b.rooms !== 1 ? 's' : ''}` : ''}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Estimated total</p>
                  <p className="mt-1 font-semibold text-secondary">{formatINR(b.total_amount)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
