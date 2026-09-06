'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { UserPlus } from 'lucide-react'
import { addAdmin, type AdminActionState } from '@/app/admin/(dashboard)/admins/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      <UserPlus className="size-4" aria-hidden />
      {pending ? 'Adding…' : 'Add admin'}
    </button>
  )
}

export function AddAdminForm() {
  const [state, action] = useActionState<AdminActionState, FormData>(addAdmin, undefined)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) formRef.current?.reset()
  }, [state?.success])

  return (
    <form ref={formRef} action={action} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="new-admin-email" className="field-label">
            Email
          </label>
          <input
            id="new-admin-email"
            name="email"
            type="email"
            required
            autoComplete="off"
            className="input"
            placeholder="colleague@example.com"
          />
        </div>
        <div>
          <label htmlFor="new-admin-password" className="field-label">
            Temporary password
          </label>
          <input
            id="new-admin-password"
            name="password"
            type="text"
            required
            minLength={8}
            autoComplete="off"
            className="input"
            placeholder="At least 8 characters"
          />
        </div>
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="text-sm text-emerald-600">
          {state.success}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton />
        <p className="text-xs text-muted-foreground">
          Share the email and temporary password with them. They can change it later.
        </p>
      </div>
    </form>
  )
}
