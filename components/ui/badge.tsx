import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> { variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'football' | 'basketball' }

const variants = {
  default: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-red-600 text-white',
  outline: 'border text-foreground',
  football: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300',
  basketball: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300',
}

export function Badge({ className, variant='default', ...props }: BadgeProps) {
  return <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', variants[variant], className)} {...props} />
}
