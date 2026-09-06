'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function InclusionTabs({ inclusions, exclusions }: { inclusions: string[]; exclusions: string[] }) {
  const [tab, setTab] = useState<'in' | 'out'>('in')
  const list = tab === 'in' ? inclusions : exclusions

  return (
    <div>
      <div className="inline-flex rounded-full border border-border bg-muted/50 p-1">
        <button
          type="button"
          onClick={() => setTab('in')}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            tab === 'in' ? 'bg-card text-secondary shadow-sm' : 'text-muted-foreground',
          )}
        >
          Inclusions
        </button>
        <button
          type="button"
          onClick={() => setTab('out')}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            tab === 'out' ? 'bg-card text-secondary shadow-sm' : 'text-muted-foreground',
          )}
        >
          Exclusions
        </button>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            {tab === 'in' ? (
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
            ) : (
              <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
