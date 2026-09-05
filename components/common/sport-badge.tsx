import { cn } from '@/lib/utils'
import { SPORTS_CONFIG, type SportType } from '@/constants/sports'

export function SportBadge({ sport, size = 'md', showIcon = true, className }: { sport: SportType; size?: 'sm' | 'md' | 'lg'; showIcon?: boolean; className?: string }) {
  const config = SPORTS_CONFIG[sport]
  const sizeClasses = { sm: 'text-xs px-2 py-0.5', md: 'text-xs px-2.5 py-1', lg: 'text-sm px-3 py-1.5' }
  const bg = sport === 'football' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' : 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800'
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border font-medium', bg, sizeClasses[size], className)}>
      {showIcon && <span>{config.icon}</span>}
      {config.name}
    </span>
  )
}

export function ConfidenceBadge({ confidence, className }: { confidence: number; className?: string }) {
  let style = 'bg-slate-100 text-slate-700 border-slate-200'
  let label = `${confidence}%`
  if (confidence >= 90) { style = 'bg-emerald-700 text-white border-emerald-800'; label = `Very High ${confidence}%` }
  else if (confidence >= 80) { style = 'bg-emerald-500 text-white border-emerald-600'; label = `High ${confidence}%` }
  else if (confidence >= 60) { style = 'bg-amber-500 text-white border-amber-600'; label = `Medium ${confidence}%` }
  else { style = 'bg-yellow-500 text-white border-yellow-600'; label = `Low ${confidence}%` }
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', style, className)}>{label}</span>
}

export function RiskBadge({ risk, className }: { risk: 'low' | 'medium' | 'high'; className?: string }) {
  const map = {
    low: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
    medium: 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
    high: 'text-red-700 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-300',
  }
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize', map[risk], className)}>{risk} Risk</span>
}
