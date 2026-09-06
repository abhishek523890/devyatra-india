import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/12 text-primary',
        maroon: 'border-transparent bg-secondary/12 text-secondary',
        gold: 'border-transparent bg-gold/25 text-gold-foreground',
        outline: 'border-border bg-background text-foreground',
        success: 'border-transparent bg-emerald-500/12 text-emerald-700',
        warning: 'border-transparent bg-amber-500/15 text-amber-700',
        danger: 'border-transparent bg-destructive/12 text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
