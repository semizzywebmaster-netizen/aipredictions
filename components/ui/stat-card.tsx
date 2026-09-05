import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'

export function StatCard({ title, value, description, icon, trend, className, sport }: { title: string; value: string | number; description?: string; icon?: React.ReactNode; trend?: 'up' | 'down' | 'neutral'; className?: string; sport?: 'football' | 'basketball' }) {
  const sportBorder = sport === 'football' ? 'border-l-emerald-500' : sport === 'basketball' ? 'border-l-orange-500' : ''
  return (
    <Card className={cn('border-l-4', sportBorder, className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
          {icon && <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && <span className={cn('text-xs font-medium', trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500')}>{trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}</span>}
        </div>
        {description && <div className="mt-1 text-xs text-muted-foreground">{description}</div>}
      </CardContent>
    </Card>
  )
}
