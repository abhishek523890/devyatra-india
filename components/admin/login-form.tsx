'use client'

import { useActionState } from 'react'
import { login, type AuthState } from '@/app/admin/actions'
import { LogIn } from 'lucide-react'

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(login, undefined)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-secondary">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-secondary">
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" placeholder="Your password" />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        <LogIn className="size-4" aria-hidden />
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
