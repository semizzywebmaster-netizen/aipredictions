import { cn } from '@/lib/utils'

export function OddsDisplay({ odds, previousOdds, size = 'md', movement, className }: { odds: number; previousOdds?: number; size?: 'sm' | 'md' | 'lg'; movement?: 'up' | 'down' | 'stable'; className?: string }) {
  const sizeClasses = { sm: 'text-xs px-2 py-1', md: 'text-sm px-2.5 py-1', lg: 'text-base px-3 py-1.5' }
  const move = movement || (previousOdds ? (odds > previousOdds ? 'up' : odds < previousOdds ? 'down' : 'stable') : 'stable')
  const moveColor = move === 'up' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : move === 'down' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200'
  return (
    <div className={cn('inline-flex items-center gap-1.5 rounded-lg border font-mono font-semibold', moveColor, sizeClasses[size], className)}>
      <span>{odds.toFixed(2)}</span>
      {move !== 'stable' && <span className="text-[10px]">{move === 'up' ? '↗' : '↘'}</span>}
    </div>
  )
}

export function OddsMovement({ current, previous }: { current: number; previous: number }) {
  if (current === previous) return <span className="text-xs text-muted-foreground">No change</span>
  const diff = current - previous
  const pct = ((diff / previous) * 100).toFixed(1)
  return <span className={cn('text-xs font-medium', diff > 0 ? 'text-emerald-600' : 'text-red-600')}>{diff > 0 ? '+' : ''}{pct}% • {current > previous ? 'Odds up' : 'Odds down'}</span>
}
