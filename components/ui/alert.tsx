import * as React from 'react'
import { cn } from '@/lib/utils'

export function Alert({ className, variant='default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' | 'football' | 'basketball' }) {
  const variants = {
    default: 'bg-white dark:bg-slate-900 text-foreground border',
    destructive: 'border-red-200 text-red-800 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-950/30',
    football: 'border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:bg-emerald-950/30',
    basketball: 'border-orange-200 text-orange-800 bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:bg-orange-950/30',
  }
  return <div role="alert" className={cn('relative w-full rounded-xl border p-4', variants[variant], className)} {...props} />
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
}
