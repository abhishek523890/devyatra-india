import Link from 'next/link'
import { Mountain } from 'lucide-react'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Mountain className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold text-secondary">DevYatra</span>
            <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary uppercase">India Admin</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-semibold text-secondary">{title}</h1>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">{subtitle}</p>
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </main>
  )
}
