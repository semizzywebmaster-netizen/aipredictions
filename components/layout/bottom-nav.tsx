'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Trophy, Dribbble, BarChart3, User } from 'lucide-react'

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/football', label: 'Football', icon: Trophy },
  { href: '/basketball', label: 'Basketball', icon: Dribbble },
  { href: '/predictions', label: 'Tips', icon: BarChart3 },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {items.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className={cn('flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium transition', active ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' : 'text-muted-foreground')}>
              <Icon className="h-5 w-5" />{item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
