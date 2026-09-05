'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Select({ children, value, onValueChange, className }: { children: React.ReactNode; value?: string; onValueChange?: (v: string) => void; className?: string }) {
  return <div className={cn('relative', className)}>{children}</div>
}

export function SelectTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', className)} {...props}>{children}</div>
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-1 rounded-xl border bg-white dark:bg-slate-900 shadow-lg p-1', className)}>{children}</div>
}

export function SelectItem({ children, value, onSelect }: { children: React.ReactNode; value: string; onSelect?: (v: string) => void }) {
  return <div onClick={() => onSelect?.(value)} className="relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 px-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">{children}</div>
}
