import { cn } from '@/lib/utils'

export function ResponsiveContainer({ children, className, size='default' }: { children: React.ReactNode; className?: string; size?: 'sm' | 'default' | 'lg' | 'full' }) {
  const sizes = { sm: 'max-w-3xl', default: 'max-w-6xl', lg: 'max-w-7xl', full: 'max-w-none' }
  return <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>{children}</div>
}

export function ResponsiveGrid({ children, className, cols=3 }: { children: React.ReactNode; className?: string; cols?: number }) {
  const colMap: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' }
  return <div className={cn('grid gap-4 sm:gap-6', colMap[cols] || colMap[3], className)}>{children}</div>
}

export function MobileOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('block lg:hidden', className)}>{children}</div>
}

export function DesktopOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('hidden lg:block', className)}>{children}</div>
}
