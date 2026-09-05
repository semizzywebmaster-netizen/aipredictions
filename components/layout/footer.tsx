import Link from 'next/link'
import { Logo } from '@/components/brand/logo'

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Logo size="md" />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">Professional sports prediction intelligence for football and basketball. Equal depth, AI-powered, responsible.</p>
            <div className="mt-4 text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300 inline-block">18+ | Bet Responsibly | Analytical insights only</div>
          </div>
          <div><div className="text-sm font-semibold">Sports</div><div className="mt-3 space-y-2 text-sm text-muted-foreground"><Link href="/football" className="block hover:text-foreground">Football</Link><Link href="/basketball" className="block hover:text-foreground">Basketball</Link><Link href="/predictions" className="block hover:text-foreground">Predictions</Link><Link href="/bet-builder" className="block hover:text-foreground">Bet Builder</Link></div></div>
          <div><div className="text-sm font-semibold">Company</div><div className="mt-3 space-y-2 text-sm text-muted-foreground"><Link href="/about" className="block hover:text-foreground">About</Link><Link href="/how-it-works" className="block hover:text-foreground">How It Works</Link><Link href="/analysts" className="block hover:text-foreground">Analysts</Link><Link href="/community" className="block hover:text-foreground">Community</Link></div></div>
          <div><div className="text-sm font-semibold">Legal</div><div className="mt-3 space-y-2 text-sm text-muted-foreground"><Link href="/responsible-betting" className="block hover:text-foreground">Responsible Betting</Link><Link href="/privacy" className="block hover:text-foreground">Privacy</Link><Link href="/terms" className="block hover:text-foreground">Terms</Link><Link href="/disclaimer" className="block hover:text-foreground">Disclaimer</Link></div></div>
        </div>
        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 PUNTER PREDICTION. All rights reserved. Professional prediction intelligence.</div>
          <div className="flex items-center gap-3"><span>Football ⚽ equal</span><span>•</span><span>Basketball 🏀 equal</span></div>
        </div>
      </div>
    </footer>
  )
}
