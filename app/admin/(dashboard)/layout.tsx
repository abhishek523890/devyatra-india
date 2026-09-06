import Link from 'next/link'
import { Mountain, LogOut, ExternalLink } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { logout } from '@/app/admin/actions'
import { AdminNav } from '@/components/admin/admin-nav'

export const metadata = { title: 'Admin' }

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-secondary p-4 text-secondary-foreground lg:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mountain className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold">DevYatra</span>
            <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary uppercase">Admin</span>
          </span>
        </Link>

        <AdminNav />

        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary-foreground/70 hover:bg-white/10 hover:text-secondary-foreground"
          >
            <ExternalLink className="size-4" aria-hidden />
            View website
          </Link>
          <p className="truncate px-3 text-xs text-secondary-foreground/50" title={user.email ?? undefined}>
            {user.email}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary-foreground/70 hover:bg-white/10 hover:text-secondary-foreground"
            >
              <LogOut className="size-4" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 lg:pl-64">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-4 py-3 text-secondary-foreground lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <Mountain className="size-5 text-primary" aria-hidden />
            <span className="font-serif text-base font-semibold">DevYatra Admin</span>
          </Link>
          <form action={logout}>
            <button type="submit" aria-label="Sign out" className="rounded-lg p-2 hover:bg-white/10">
              <LogOut className="size-5" aria-hidden />
            </button>
          </form>
        </div>

        <div className="lg:hidden">
          <div className="overflow-x-auto border-b border-border bg-card px-2 py-2">
            <div className="min-w-max">
              <AdminNav />
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
