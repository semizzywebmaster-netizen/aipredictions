import { cn } from '@/lib/utils'
import { Brain, BarChart3, TrendingUp, Info } from 'lucide-react'

export interface ReasoningBlock {
  title: string
  content: string
  confidence?: number
  type?: 'statistical' | 'form' | 'h2h' | 'news' | 'model'
}

export function AIReasoning({ reasoning, blocks, className }: { reasoning?: string; blocks?: ReasoningBlock[]; className?: string }) {
  return (
    <div className={cn('space-y-4 rounded-2xl border bg-white dark:bg-slate-900 p-5', className)}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center"><Brain className="h-4 w-4 text-indigo-600" /></div>
        <div><div className="text-sm font-semibold">AI Analytical Reasoning</div><div className="text-[11px] text-muted-foreground">Data-backed • Not a guarantee • Analytical confidence only</div></div>
      </div>
      {reasoning && <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{reasoning}</p>}
      {blocks && blocks.length > 0 && (
        <div className="grid gap-3">
          {blocks.map((b, i) => (
            <div key={i} className="rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold"><BarChart3 className="h-3.5 w-3.5" />{b.title}</div>
                {b.confidence && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border">{b.confidence}% weight</span>}
              </div>
              <div className="mt-1.5 text-xs leading-snug text-muted-foreground">{b.content}</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-2.5">
        <Info className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-[11px] text-amber-800 dark:text-amber-300 leading-snug">AI insights are statistical estimates. Past performance does not predict future results. 18+ Bet responsibly.</div>
      </div>
    </div>
  )
}
