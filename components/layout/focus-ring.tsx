'use client'
import { cn } from '@/lib/utils'

export function FocusRing({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-xl', className)}>{children}</div>
}
