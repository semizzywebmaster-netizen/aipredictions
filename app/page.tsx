import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Logo } from '@/components/brand/logo'
import { SportBadge, ConfidenceBadge } from '@/components/common/sport-badge'
import { ConfidenceIndicator } from '@/components/common/confidence-indicator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, Shield, Trophy, Dribbble, Calculator, Users, Sparkles, BarChart3, Zap } from 'lucide-react'

const featuredPredictions = [
  { id: '1', sport: 'football' as const, league: 'Premier League', home: 'Arsenal', away: 'Man City', market: '1X2', pick: 'Home Win', confidence: 82, odds: 2.45 },
  { id: '2', sport: 'basketball' as const, league: 'NBA', home: 'Lakers', away: 'Warriors', market: 'Moneyline', pick: 'Lakers ML', confidence: 78, odds: 1.89 },
  { id: '3', sport: 'football' as const, league: 'La Liga', home: 'Real Madrid', away: 'Barcelona', market: 'BTTS', pick: 'Yes', confidence: 85, odds: 1.75 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white dark:bg-slate-900 px-4 py-1.5 text-xs font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />Live • Football & Basketball Intelligence
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance">
              Professional Sports<br />
              <span className="bg-gradient-to-r from-emerald-600 via-slate-900 to-orange-600 dark:from-emerald-400 dark:via-white dark:to-orange-400 bg-clip-text text-transparent">Prediction Intelligence</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-balance">AI-powered analytics for football and basketball with equal depth. No guaranteed wins, only statistical insights, confidence levels, and responsible analysis.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/football"><Button size="lg" variant="football" className="w-full sm:w-auto"><Trophy className="mr-2 h-4 w-4" />Explore Football</Button></Link>
              <Link href="/basketball"><Button size="lg" variant="basketball" className="w-full sm:w-auto"><Dribbble className="mr-2 h-4 w-4" />Explore Basketball</Button></Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />18+ Responsible</span>
              <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5" />AI Confidence</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" />No Guarantees</span>
            </div>
          </div>

          {/* Sports selector visual */}
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group relative overflow-hidden border-emerald-200 hover:shadow-emerald-100 hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition" />
              <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm">⚽</span>Football Intelligence</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Premier League, La Liga, Champions League, 30+ leagues, dynamic markets: 1X2, Over/Under, BTTS, Asian Handicap.</div>
                <div className="mt-4 flex gap-2 flex-wrap"><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">1X2</span><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">BTTS</span><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Corners</span></div>
                <Link href="/football" className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800">Explore <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-orange-200 hover:shadow-orange-100 hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition" />
              <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-8 w-8 rounded-xl bg-orange-600 text-white flex items-center justify-center text-sm">🏀</span>Basketball Intelligence</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">NBA, WNBA, EuroLeague, NCAA, dynamic markets: Moneyline, Spread, Over/Under, Quarter markets.</div>
                <div className="mt-4 flex gap-2 flex-wrap"><span className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">Moneyline</span><span className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">Spread</span><span className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">Totals</span></div>
                <Link href="/basketball" className="mt-4 inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-800">Explore <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured predictions */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div><h2 className="text-2xl font-bold tracking-tight">Featured Predictions</h2><p className="text-sm text-muted-foreground mt-1">Analytical insights with confidence & risk • Not guarantees</p></div>
            <Link href="/predictions" className="text-sm font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredPredictions.map(p => (
              <Card key={p.id} className="hover:shadow-md transition">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3"><SportBadge sport={p.sport} size="sm" /><span className="text-xs text-muted-foreground">{p.league}</span></div>
                  <div className="font-medium text-sm">{p.home} vs {p.away}</div>
                  <div className="mt-2 flex items-center justify-between"><div><div className="text-xs text-muted-foreground">{p.market}</div><div className="text-sm font-semibold">{p.pick}</div></div><div className="text-right"><div className="text-xs text-muted-foreground">Odds</div><div className="font-mono text-sm font-bold">{p.odds.toFixed(2)}</div></div></div>
                  <div className="mt-3"><ConfidenceIndicator confidence={p.confidence} size="sm" /></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Preview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"><Brain className="h-3.5 w-3.5" />AI Sports Assistant</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance">Ask AI about any match, team, or strategy</h2>
              <p className="mt-3 text-muted-foreground">Streaming-ready chat, sport context, match context, analytical confidence. Backend AI provider abstraction - no secrets in frontend.</p>
              <div className="mt-6 space-y-3">
                <div className="flex gap-3 p-3 rounded-xl border bg-white dark:bg-slate-900"><div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">⚽</div><div><div className="text-sm font-medium">Analyze Arsenal vs Man City form</div><div className="text-xs text-muted-foreground">Get H2H, home/away, risk breakdown</div></div></div>
                <div className="flex gap-3 p-3 rounded-xl border bg-white dark:bg-slate-900"><div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">🏀</div><div><div className="text-sm font-medium">Compare Lakers vs Warriors spread value</div><div className="text-xs text-muted-foreground">Statistical edge & confidence</div></div></div>
              </div>
              <Link href="/ai" className="mt-6 inline-flex"><Button><Sparkles className="mr-2 h-4 w-4" />Try AI Assistant</Button></Link>
            </div>
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900 border-indigo-200 dark:border-indigo-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3"><div className="h-8 w-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold">AI</div><div className="flex-1 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border p-3 text-sm">I analyzed 15 factors: home form (W4 D1), xG 1.8 vs 1.2, defensive injuries impact. Estimated probability 58% for Over 2.5, analytical confidence 78% (Medium), risk Medium.</div></div>
                <div className="flex items-start gap-3 justify-end"><div className="rounded-2xl rounded-tr-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 text-sm max-w-[80%]">Build me a balanced 5-odd bet for tonight</div></div>
                <div className="flex items-start gap-3"><div className="h-8 w-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold">AI</div><div className="flex-1 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border p-3 text-sm space-y-2"><div>Here is a balanced strategy (target 5.0 odds):</div><div className="text-xs font-mono bg-slate-50 dark:bg-slate-700 p-2 rounded-lg">• Arsenal Over 1.5 Team Goals @1.85 (72% conf)<br/>• Lakers -3.5 Spread @1.90 (68% conf)<br/>• Real Madrid BTTS Yes @1.75 (75% conf)</div><div className="text-[11px] text-muted-foreground">Total 6.15 odds • Avg conf 71% • Medium risk. Not a guarantee.</div></div></div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bet builder preview */}
      <section className="py-16 bg-slate-900 dark:bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs"><Calculator className="h-3.5 w-3.5" />Smart Bet Builder</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Build, optimize, target odds</h2>
              <p className="mt-3 text-slate-300">Conservative, Balanced, Aggressive strategies. Target odds 2,5,10,20,50,100,custom. Real-time validation, estimated return, confidence aggregation.</p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4"><div className="text-xs text-slate-400">Conservative</div><div className="mt-1 font-semibold">Low risk, steady insights</div><div className="mt-2 text-xs text-slate-400">Target 2-5 odds</div></div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4"><div className="text-xs text-slate-400">Balanced</div><div className="mt-1 font-semibold">Medium risk/reward</div><div className="mt-2 text-xs text-slate-400">Target 5-20 odds</div></div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4"><div className="text-xs text-slate-400">Aggressive</div><div className="mt-1 font-semibold">High variance</div><div className="mt-2 text-xs text-slate-400">Target 20-100+ odds</div></div>
              </div>
              <Link href="/bet-builder" className="mt-6 inline-flex"><Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">Open Bet Builder <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
            <div className="rounded-2xl bg-white text-slate-900 p-5">
              <div className="text-sm font-semibold">Bet Slip • Balanced • Target 5.0</div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm"><span>Arsenal Over 1.5</span><span className="font-mono">1.85</span></div>
                <div className="flex justify-between text-sm"><span>Lakers -3.5</span><span className="font-mono">1.90</span></div>
                <div className="flex justify-between text-sm"><span>Real BTTS Yes</span><span className="font-mono">1.75</span></div>
                <div className="border-t pt-3 flex justify-between font-semibold"><span>Total Odds</span><span className="font-mono">6.15</span></div>
                <div className="text-xs text-muted-foreground">Estimated return: ₦6,150 on ₦1,000 stake • Avg conf 71% • Medium risk • Not guaranteed</div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-2 text-[11px] text-amber-800">Target odds do not guarantee outcomes. 18+ Bet responsibly.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community + Subscriptions */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Community Feed</CardTitle></CardHeader><CardContent className="space-y-3"><div className="p-3 rounded-xl border bg-white dark:bg-slate-900 text-sm"><div className="flex items-center gap-2"><div className="h-6 w-6 rounded-full bg-emerald-100" /><span className="font-medium">@analystPro</span><span className="text-xs text-muted-foreground">• 2h ago</span></div><div className="mt-2">Arsenal Over 1.5 + Lakers ML double • Confidence 79% • Sharing analytical reasoning thread 🧵</div></div><Link href="/community" className="text-sm font-medium text-primary hover:underline">Explore community →</Link></CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" />Subscription Plans</CardTitle></CardHeader><CardContent><div className="grid grid-cols-3 gap-2"><div className="rounded-xl border p-3 text-center"><div className="text-xs font-medium">Free</div><div className="mt-1 font-bold">₦0</div><div className="mt-1 text-[11px] text-muted-foreground">Limited</div></div><div className="rounded-xl border-2 border-slate-900 dark:border-white p-3 text-center"><div className="text-xs font-medium">Basic</div><div className="mt-1 font-bold">₦2,500</div><div className="mt-1 text-[11px] text-muted-foreground">Popular</div></div><div className="rounded-xl border p-3 text-center"><div className="text-xs font-medium">Premium</div><div className="mt-1 font-bold">₦5,000</div><div className="mt-1 text-[11px] text-muted-foreground">AI+</div></div></div><Link href="/subscriptions" className="mt-4 block text-sm font-medium text-primary hover:underline">Compare plans →</Link></CardContent></Card>
        </div>
      </section>

      {/* Responsible Betting */}
      <section className="py-10 border-y bg-amber-50/50 dark:bg-amber-950/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-300">Responsible Betting • 18+</div>
          <p className="mt-3 max-w-3xl mx-auto text-sm text-muted-foreground">PUNTER PREDICTION provides analytical insights, not guaranteed wins. All predictions include confidence and risk levels. Never bet more than you can afford to lose. If you need support, contact responsible gambling resources in your region. Football and basketball predictions are statistical estimates.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
