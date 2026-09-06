import { ShieldCheck } from 'lucide-react'
import { listAdmins, removeAdmin } from './actions'
import { AddAdminForm } from '@/components/admin/add-admin-form'
import { DeleteButton } from '@/components/admin/delete-button'

export const metadata = { title: 'Admins' }

function formatDate(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminsPage() {
  const admins = await listAdmins()

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold text-foreground">Admins</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          People who can sign in and manage the site. Only accounts listed here have admin access.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-secondary uppercase">Add an admin</h2>
        <AddAdminForm />
      </section>

      <section className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold tracking-wide text-secondary uppercase">
            Current admins ({admins.length})
          </h2>
        </div>
        <ul className="divide-y divide-border">
          {admins.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {a.email}
                    {a.isSelf && (
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">Added {formatDate(a.createdAt)}</p>
                </div>
              </div>
              {a.isSelf ? (
                <span className="text-xs text-muted-foreground">Can&apos;t remove yourself</span>
              ) : (
                <DeleteButton
                  action={removeAdmin}
                  id={a.id}
                  label="Remove"
                  confirmText={`Remove admin access for ${a.email}? They will no longer be able to sign in.`}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
