import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const leagues = ['NBA', 'WNBA', 'NCAA Men', 'NCAA Women', 'EuroLeague', 'EuroCup', 'ACB/Liga Endesa', 'Basketball Bundesliga', 'LNB Pro A', 'Lega Basket Serie A', 'Greek Basket League', 'Turkish BSL', 'ABA League']

export default function BasketballPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><SportBadge sport="basketball" size="lg" /><h1 className="text-2xl font-bold tracking-tight">Basketball Platform</h1></div>
      <p className="text-sm text-muted-foreground">Complete basketball experience with equal depth to football: dashboard, competitions, leagues, fixtures, teams, players, statistics, predictions, navigation.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-orange-200"><CardHeader><CardTitle className="text-sm">Competitions</CardTitle></CardHeader><CardContent className="space-y-2">{leagues.map(l => <Link key={l} href={`/leagues/${encodeURIComponent(l)}`} className="block text-sm p-2 rounded-lg hover:bg-orange-50">{l}</Link>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Today Fixtures</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Fixtures via /api/v1/fixtures?sport=basketball • Live state, scores, quarter breakdowns, team totals, odds • Live-update-ready</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Predictions</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Markets: Moneyline, Point Spread, Over/Under, Team Totals, Quarter markets, Half markets, Player markets when reliable data exists.</CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Basketball Dashboard Equal Depth</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Basketball must have equal product depth to football per product vision. No afterthought. Same quality dashboards, statistics, predictions, match centers, AI analysis, bet builder, community.</CardContent></Card>
    </div>
  )
}
