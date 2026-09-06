'use client'

export function StatusSelect({
  action,
  id,
  value,
  options,
}: {
  action: (formData: FormData) => void | Promise<void>
  id: string
  value: string
  options: { value: string; label: string }[]
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
        aria-label="Update status"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  )
}
