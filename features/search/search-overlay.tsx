'use client'
import { useState, useEffect } from 'react'
import { Search, Clock, Trophy, Dribbble, Users, BarChart3, X } from 'lucide-react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { STORAGE_KEYS } from '@/config/constants'

export function SearchOverlay({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useLocalStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES, [])
  
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const handleSearch = (q: string) => {
    if (!q.trim()) return
    const updated = [q, ...recent.filter(r => r !== q)].slice(0, 8)
    setRecent(updated)
    onSearch(q)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSearch(query) }} placeholder="Search teams, players, leagues, fixtures, predictions..." className="flex-1 bg-transparent outline-none text-sm" />
          <button onClick={onClose} className="h-8 w-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-auto">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Recent searches</div>
            {recent.length ? <div className="flex flex-wrap gap-2">{recent.map(r => <button key={r} onClick={() => handleSearch(r)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-slate-50 dark:bg-slate-800 text-xs hover:bg-slate-100"><Clock className="h-3 w-3" />{r}</button>)}</div> : <div className="text-xs text-muted-foreground">No recent searches</div>}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Quick filters</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleSearch('Premier League')} className="flex items-center gap-2 p-3 rounded-xl border hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"><Trophy className="h-4 w-4 text-emerald-600" />Football leagues</button>
              <button onClick={() => handleSearch('NBA')} className="flex items-center gap-2 p-3 rounded-xl border hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"><Dribbble className="h-4 w-4 text-orange-600" />Basketball leagues</button>
              <button onClick={() => handleSearch('predictions')} className="flex items-center gap-2 p-3 rounded-xl border hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"><BarChart3 className="h-4 w-4" />Predictions</button>
              <button onClick={() => handleSearch('analysts')} className="flex items-center gap-2 p-3 rounded-xl border hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"><Users className="h-4 w-4" />Analysts</button>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground">Press ESC to close • Enter to search</div>
        </div>
      </div>
    </div>
  )
}
