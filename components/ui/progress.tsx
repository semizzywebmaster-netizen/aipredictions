'use client'
import { cn } from '@/lib/utils'

export function Progress({ value, className, indicatorClassName }: { value: number; className?: string; indicatorClassName?: string }) {
  const clamped = Math.min(100, Math.max(0, value))
  return <div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', className)}><div className={cn('h-full bg-slate-900 dark:bg-white transition-all', indicatorClassName)} style={{ width: `${clamped}%` }} /></div>
}
