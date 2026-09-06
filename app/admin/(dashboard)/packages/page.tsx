import Link from 'next/link'
import { Plus, Pencil, Star, AlertTriangle, PackageOpen } from 'lucide-react'
import { getAllPackagesAdmin } from '@/lib/packages'
import { formatINR } from '@/lib/format'
import { deletePackage } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'
import type { Package } from '@/lib/types'

export const metadata = { title: 'Packages' }

const statusStyles: Record<Package['status'], string> = {
  published: 'bg-emerald-100 text-emerald-800',
  draft: 'bg-muted text-muted-foreground',
  inactive: 'bg-amber-100 text-amber-800',
  sold_out: 'bg-destructive/10 text-destructive',
}

export default async function AdminPackagesPage() {
  let packages: Package[] = []
  let dbError = false
  try {
    packages = await getAllPackagesAdmin()
  } catch {
    dbError = true
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-secondary">Packages</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit and publish the tours shown on your website.</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" aria-hidden />
          Add package
        </Link>
      </div>

      {dbError ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
            <p className="text-sm text-amber-800">
              The database tables are not set up yet. Run{' '}
              <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">scripts/001_admin_schema.sql</code>{' '}
              in the Supabase SQL Editor, then refresh.
            </p>
          </div>
        </div>
      ) : packages.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <PackageOpen className="size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">No packages yet. Create your first pilgrimage package.</p>
          <Link href="/admin/packages/new" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4" aria-hidden /> Add package
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Category</th>
                <th className="hidden px-4 py-3 font-semibold md:table-cell">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.featured && <Star className="size-3.5 shrink-0 fill-accent text-accent" aria-label="Featured" />}
                      <div>
                        <div className="font-medium text-secondary">{p.name}</div>
                        <div className="text-xs text-muted-foreground">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{p.category}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{formatINR(p.discountedPrice || p.basePrice)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[p.status]}`}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/packages/${p.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-secondary hover:bg-muted"
                      >
                        <Pencil className="size-4" aria-hidden />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <DeleteButton action={deletePackage} id={p.id} confirmText={`Delete "${p.name}"? This cannot be undone.`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
