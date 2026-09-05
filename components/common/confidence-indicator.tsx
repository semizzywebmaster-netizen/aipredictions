'use client'
import { cn } from '@/lib/utils'

export function ConfidenceIndicator({ confidence, size = 'md', showLabel = true, className }: { confidence: number; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean; className?: string }) {
  const clamped = Math.min(100, Math.max(0, confidence))
  const getColor = () => {
    if (clamped >= 90) return 'bg-emerald-700'
    if (clamped >= 80) return 'bg-emerald-500'
    if (clamped >= 60) return 'bg-amber-500'
    return 'bg-yellow-500'
  }
  const getLabel = () => {
    if (clamped >= 90) return 'Very High'
    if (clamped >= 80) return 'High'
    if (clamped >= 60) return 'Medium'
    return 'Low'
  }
  const sizeMap = { sm: 'h-1.5', md: 'h-2', lg: 'h-2.5' }
  return (
    <div className={cn('space-y-1.5', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Analytical Confidence</span>
          <span className="font-semibold">{getLabel()} • {clamped}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden', sizeMap[size])}>
        <div className={cn('h-full rounded-full transition-all duration-700', getColor())} style={{ width: `${clamped}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Low</span><span>Medium</span><span>High</span><span>Very High</span>
      </div>
    </div>
  )
}

export function ConfidenceCircle({ confidence, size = 56 }: { confidence: number; size?: number }) {
  const clamped = Math.min(100, Math.max(0, confidence))
  const circumference = 2 * Math.PI * 20
  const offset = circumference - (clamped / 100) * circumference
  const color = clamped >= 80 ? '#059669' : clamped >= 60 ? '#d97706' : '#eab308'
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={20} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth={4} fill="none" />
        <circle cx={size/2} cy={size/2} r={20} stroke={color} strokeWidth={4} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <span className="absolute text-xs font-bold">{clamped}%</span>
    </div>
  )
}
