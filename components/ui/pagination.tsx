'use client'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ current, total, onPageChange, className }: { current: number; total: number; onPageChange: (p: number) => void; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <button disabled={current <= 1} onClick={() => onPageChange(current - 1)} className="h-9 w-9 rounded-xl border bg-white dark:bg-slate-900 flex items-center justify-center disabled:opacity-50 hover:bg-slate-50"><ChevronLeft className="h-4 w-4" /></button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, total) }, (_, i) => {
          let page = i + 1
          if (total > 5) {
            if (current <= 3) page = i + 1
            else if (current >= total - 2) page = total - 4 + i
            else page = current - 2 + i
          }
          const active = page === current
          return <button key={page} onClick={() => onPageChange(page)} className={cn('h-9 w-9 rounded-xl text-sm font-medium', active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border bg-white dark:bg-slate-900 hover:bg-slate-50')}>{page}</button>
        })}
      </div>
      <button disabled={current >= total} onClick={() => onPageChange(current + 1)} className="h-9 w-9 rounded-xl border bg-white dark:bg-slate-900 flex items-center justify-center disabled:opacity-50 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
    </div>
  )
}
