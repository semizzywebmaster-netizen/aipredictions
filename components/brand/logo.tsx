'use client'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'mark' | 'text'
  className?: string
  sport?: 'football' | 'basketball' | 'neutral'
}

const sizes = { sm: 'h-6 w-6 text-[10px]', md: 'h-8 w-8 text-xs', lg: 'h-10 w-10 text-sm', xl: 'h-12 w-12 text-base' }

export function Logo({ size = 'md', variant = 'full', className, sport = 'neutral' }: LogoProps) {
  const sportGradient = sport === 'football' ? 'from-emerald-600 to-emerald-700' : sport === 'basketball' ? 'from-orange-600 to-orange-700' : 'from-slate-900 to-slate-800 dark:from-white dark:to-slate-200'
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {(variant === 'full' || variant === 'mark') && (
        <div className={cn('relative rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-sm', sportGradient, sizes[size])}>
          <span className="tracking-tighter">PP</span>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900 flex items-center justify-center">
            <div className={cn('w-1 h-1 rounded-full', sport === 'football' ? 'bg-emerald-600' : sport === 'basketball' ? 'bg-orange-600' : 'bg-indigo-600')} />
          </div>
        </div>
      )}
      {(variant === 'full' || variant === 'text') && (
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-[15px]">PUNTER</span>
          <span className="font-bold tracking-tight text-[15px] -mt-1">PREDICTION</span>
        </div>
      )}
    </div>
  )
}

export function SportLogo({ sport, size = 'md' }: { sport: 'football' | 'basketball'; size?: LogoProps['size'] }) {
  return <Logo sport={sport} size={size} variant="mark" />
}
