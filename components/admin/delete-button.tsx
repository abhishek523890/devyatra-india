'use client'

import { Trash2 } from 'lucide-react'

export function DeleteButton({
  action,
  id,
  confirmText = 'Delete this item? This cannot be undone.',
  className = '',
  label,
}: {
  action: (formData: FormData) => void | Promise<void>
  id: string
  confirmText?: string
  className?: string
  label?: string
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          className ||
          'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
        }
      >
        <Trash2 className="size-4" aria-hidden />
        {label}
      </button>
    </form>
  )
}
