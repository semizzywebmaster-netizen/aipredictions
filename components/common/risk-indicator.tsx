import { cn } from '@/lib/utils'
import { AlertTriangle, Shield, ShieldAlert } from 'lucide-react'

export function RiskIndicator({ risk, reason, className }: { risk: 'low' | 'medium' | 'high'; reason?: string; className?: string }) {
  const config = {
    low: { icon: Shield, label: 'Low Risk', desc: 'Statistically favorable', color: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300' },
    medium: { icon: ShieldAlert, label: 'Medium Risk', desc: 'Moderate variance', color: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300' },
    high: { icon: AlertTriangle, label: 'High Risk', desc: 'High variance, use caution', color: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300' },
  }
  const c = config[risk]
  const Icon = c.icon
  return (
    <div className={cn('flex items-start gap-2.5 rounded-xl border p-3', c.color, className)}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="space-y-0.5">
        <div className="text-xs font-semibold">{c.label} • {c.desc}</div>
        {reason && <div className="text-[11px] opacity-80 leading-snug">{reason}</div>}
      </div>
    </div>
  )
}
