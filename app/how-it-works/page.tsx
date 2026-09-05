import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = { title: 'How It Works' }

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight">How It Works</h1>
        <p className="mt-4 text-muted-foreground">Our platform aggregates dynamic sports data via /api/v1, applies AI analysis, and presents confidence and risk indicators. No guarantees, only analytical insights.</p>
        <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm leading-relaxed">PUNTER PREDICTION is a professional sports prediction intelligence platform treating football and basketball as equal first-class sports. Both sports have comparable dashboards, leagues, fixtures, teams, players, statistics, predictions, match centers, markets, AI analysis, bet builder support, history, and community features.</p>
          <p className="text-sm leading-relaxed mt-4">Our API-first frontend communicates via /api/v1 and never exposes private credentials. Football color #059669, Basketball #EA580C, premium dark/light themes.</p>
          <div className="mt-8 p-4 rounded-xl border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">18+ | Bet Responsibly | Analytical insights only, not guarantees.</div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-white dark:bg-slate-900"><div className="font-medium">Football</div><div className="text-sm text-muted-foreground mt-1">Dynamic leagues: Premier League, La Liga, Serie A, Bundesliga, UCL, MLS, and more. Markets: 1X2, Over/Under, BTTS, Asian Handicap, Corners, Cards.</div></div>
            <div className="p-4 rounded-xl border bg-white dark:bg-slate-900"><div className="font-medium">Basketball</div><div className="text-sm text-muted-foreground mt-1">NBA, WNBA, EuroLeague, NCAA, ACB. Markets: Moneyline, Point Spread, Over/Under, Team Totals, Quarter/Half markets.</div></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
