import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800', className)} {...props} />
}

export function Spinner({ size='md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }
  return <div className={cn('animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-white', s[size], className)} />
}
