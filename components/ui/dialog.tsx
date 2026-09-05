'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 max-h-[90vh] overflow-auto">{children}</div>
    </div>
  )
}

export function DialogContent({ className, children, onClose }: { className?: string; children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className={cn('relative bg-white dark:bg-slate-900 rounded-2xl border shadow-lg w-full max-w-lg mx-4 p-6 animate-in fade-in-0 zoom-in-95', className)}>
      {onClose && <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-4 w-4" /></button>}
      {children}
    </div>
  )
}
