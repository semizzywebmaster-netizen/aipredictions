'use client'
import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchInput({ value, onChange, placeholder='Search...', className, onClear }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; onClear?: () => void }) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="flex h-10 w-full rounded-xl border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      {value && <button onClick={() => { onChange(''); onClear?.() }} className="absolute right-3 rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-4 w-4" /></button>}
    </div>
  )
}
