'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'
import { LayoutDashboard, Trophy, Dribbble, BarChart3, Calculator, Code2, Wallet, Crown, Bot, Users, Bell, Settings, Shield } from 'lucide-react'

const sidebarGroups = [
  { title: 'Overview', items: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/football', label: 'Football', icon: Trophy, sport: 'football' },
    { href: '/basketball', label: 'Basketball', icon: Dribbble, sport: 'basketball' },
  ]},
  { title: 'Predictions', items: [
    { href: '/predictions', label: 'All Predictions', icon: BarChart3 },
    { href: '/bet-builder', label: 'Bet Builder', icon: Calculator },
    { href: '/bet-codes', label: 'Bet Codes', icon: Code2 },
  ]},
  { title: 'Account', items: [
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/subscriptions', label: 'Subscriptions', icon: Crown },
    { href: '/ai', label: 'AI Assistant', icon: Bot },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ]},
  { title: 'System', items: [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/admin', label: 'Admin', icon: Shield, adminOnly: true },
  ]},
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
  return (
    <aside className={cn('w-64 shrink-0 border-r bg-white dark:bg-slate-900 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 hidden lg:block', className)}>
      <div className="space-y-6">
        {sidebarGroups.map(group => (
          <div key={group.title}>
            <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</div>
            <div className="space-y-1">
              {group.items.map(item => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} className={cn('flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition', isActive(item.href) ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-foreground')}>
                    <Icon className="h-4 w-4" />{item.label}
                    {item.sport === 'football' && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />}
                    {item.sport === 'basketball' && <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 p-4 text-white dark:text-slate-900">
          <div className="text-sm font-semibold">Responsible Betting</div>
          <div className="mt-1 text-xs opacity-80 leading-snug">18+ • Predictions are analytical insights, not guarantees. Bet responsibly.</div>
        </div>
      </div>
    </aside>
  )
}
