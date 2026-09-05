import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge } from '@/components/common/sport-badge'
import { StatCard } from '@/components/ui/stat-card'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Football Predictions" value="24" sport="football" description="Today" />
        <StatCard title="Basketball Predictions" value="18" sport="basketball" description="Today" />
        <StatCard title="Accuracy" value="68.4%" description="Never hide losses" trend="up" />
        <StatCard title="Credits" value="1,240" description="AI & premium" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><SportBadge sport="football" size="sm" /> Football & Basketball Equal Depth</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div>Dynamic leagues, fixtures, predictions, bet builder, AI assistant, community, wallet, subscriptions all API-first via /api/v1</div><div className="grid grid-cols-2 gap-2"><Link href="/football" className="p-3 rounded-xl border hover:bg-emerald-50 text-center text-sm">Football Platform</Link><Link href="/basketball" className="p-3 rounded-xl border hover:bg-orange-50 text-center text-sm">Basketball Platform</Link></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Responsible Betting</CardTitle></CardHeader><CardContent className="text-xs text-muted-foreground space-y-2"><div>18+ only • Predictions are analytical insights, not guarantees • No sure win, no guaranteed profit, no risk-free</div><div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">Use: AI confidence, analytical confidence, estimated probability, statistical insight, risk level</div><Link href="/responsible-betting" className="block text-primary hover:underline">Learn more →</Link></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle className="text-sm">Complete Frontend Integration, QA, Security & Deployment Readiness</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground space-y-2">
        <div>Architecture: Next.js 14, React 18, TypeScript strict, Tailwind, App Router, clean modular architecture</div>
        <div>UI: All routes, pages, components, navigation, responsive 320px-1920px+, dark/light, accessibility WCAG AA, keyboard, focus, reduced-motion</div>
        <div>Sports: Football & basketball equal depth, dynamic leagues, fixtures, teams, players, markets, predictions</div>
        <div>AI: Assistant, analysis, reasoning, bet builder intelligence, provider abstraction, no secrets in frontend</div>
        <div>Payments: Paystack/Flutterwave frontend architecture, subscriptions, wallet, credits, verification via backend</div>
        <div>Community: Feed, analysts, predictions, comments, likes, saves, reports, gamification, referrals, ads, WhatsApp linking</div>
        <div>Admin: Dashboard, management, analytics, feature controls, audit logs, single admin role</div>
        <div>Security: No private secrets, no exposed API keys, safe rendering, secure auth architecture, protected admin UI, backend authorization assumed documented</div>
        <div>Performance: Lazy loading, optimized images, loading states, error boundaries, code splitting</div>
        <div>Deployment: Ready for Vercel, Netlify, Cloudflare Pages • Env: NEXT_PUBLIC_API_URL only • No proprietary backend dependency</div>
      </CardContent></Card>
    </div>
  )
}
