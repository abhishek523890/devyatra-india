import { createClient } from '@/lib/supabase/server'
import { AlertTriangle, MessageSquare } from 'lucide-react'
import { updateEnquiryStatus, deleteEnquiry } from '../manage-actions'
import { StatusSelect } from '@/components/admin/status-select'
import { DeleteButton } from '@/components/admin/delete-button'

export const metadata = { title: 'Enquiries' }

type Enquiry = {
  id: string
  source: string
  name: string
  phone: string | null
  email: string | null
  message: string | null
  details: Record<string, unknown>
  status: string
  created_at: string
}

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
]

const sourceLabels: Record<string, string> = {
  contact: 'Contact form',
  custom_tour: 'Custom tour',
  char_dham: 'Char Dham',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminEnquiriesPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-secondary">Enquiries</h1>
      <p className="mt-1 text-sm text-muted-foreground">Messages from your contact, custom tour and Char Dham forms.</p>

      {error ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
          <span>
            Run <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">scripts/001_admin_schema.sql</code> in the Supabase SQL Editor, then refresh.
          </span>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <MessageSquare className="size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">No enquiries yet.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {(data as Enquiry[]).map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {sourceLabels[e.source] ?? e.source}
                    </span>
                    <span className="text-xs text-muted-foreground">· {fmtDate(e.created_at)}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-semibold text-secondary">{e.name}</h2>
                  <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                    {e.phone && <a href={`tel:${e.phone}`} className="hover:text-primary">{e.phone}</a>}
                    {e.email && <a href={`mailto:${e.email}`} className="hover:text-primary">{e.email}</a>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusSelect action={updateEnquiryStatus} id={e.id} value={e.status} options={statusOptions} />
                  <DeleteButton action={deleteEnquiry} id={e.id} confirmText={`Delete enquiry from ${e.name}?`} />
                </div>
              </div>

              {e.message && <p className="mt-3 whitespace-pre-wrap border-t border-border pt-3 text-sm text-secondary">{e.message}</p>}

              {e.details && Object.keys(e.details).length > 0 && (
                <dl className="mt-3 grid gap-2 border-t border-border pt-3 text-sm sm:grid-cols-2">
                  {Object.entries(e.details).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="font-medium capitalize text-muted-foreground">{k.replace(/_/g, ' ')}:</dt>
                      <dd className="text-secondary">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
