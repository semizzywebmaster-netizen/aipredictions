'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Search, Bell, Menu, User, Trophy, BarChart3, MessageCircle, Settings } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: Trophy },
  { href: '/football', label: 'Football', sport: 'football' as const },
  { href: '/basketball', label: 'Basketball', sport: 'basketball' as const },
  { href: '/predictions', label: 'Predictions', icon: BarChart3 },
  { href: '/bet-builder', label: 'Bet Builder' },
  { href: '/community', label: 'Community', icon: MessageCircle },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0"><Logo size="md" /></Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.href} href={item.href} className={cn('px-3 py-2 rounded-xl text-sm font-medium transition', isActive(item.href) ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground')}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/search" className="h-9 w-9 rounded-xl border bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50"><Search className="h-4 w-4" /></Link>
            <Link href="/notifications" className="h-9 w-9 rounded-xl border bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50 relative"><Bell className="h-4 w-4" /><span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" /></Link>
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium border bg-white dark:bg-slate-900 hover:bg-slate-50">Login</Link>
              <Link href="/register" className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90">Get Started</Link>
            </div>
            <Link href="/profile" className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><User className="h-4 w-4" /></Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden h-9 w-9 rounded-xl border bg-white dark:bg-slate-900 flex items-center justify-center"><Menu className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-slate-900 p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn('flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium', isActive(item.href) ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'hover:bg-slate-50 dark:hover:bg-slate-800')}>{item.label}</Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link href="/login" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border text-center">Login</Link>
            <Link href="/register" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export function PublicHeader() { return <Header /> }
