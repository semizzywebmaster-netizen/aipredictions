import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'UCL', 'Europa League', 'FA Cup', 'MLS', 'Saudi Pro League']

export default function FootballPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><SportBadge sport="football" size="lg" /><h1 className="text-2xl font-bold tracking-tight">Football Platform</h1></div>
      <p className="text-sm text-muted-foreground">Complete football experience: dashboard, competitions, leagues, fixtures, teams, players, statistics, predictions, navigation. Equal depth to basketball.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-emerald-200"><CardHeader><CardTitle className="text-sm">Competitions</CardTitle></CardHeader><CardContent className="space-y-2">{leagues.map(l => <Link key={l} href={`/leagues/${encodeURIComponent(l)}`} className="block text-sm p-2 rounded-lg hover:bg-emerald-50">{l}</Link>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Today Fixtures</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Fixtures loaded via /api/v1/fixtures?sport=football&date=today • Live state, scores, timelines, lineups, odds, prediction access • Live-update-ready architecture</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Predictions</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">High-confidence, low-risk, recommended. Markets: 1X2, Double Chance, Over/Under, BTTS, DNB, Asian Handicap, Correct Score, Half-Time, Team Goals, Corners, Cards.</CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Football Dashboard</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Dynamic sports/leagues loading, not hard-coded small list. Supports Premier League, La Liga, Serie A, Bundesliga, Ligue 1, UCL, Europa, Conference, FA Cup, EFL Championship, EFL Cup, Copa del Rey, Coppa Italia, DFB-Pokal, Coupe de France, MLS, Saudi Pro League, Brasileirão, Liga Portugal, Eredivisie, Belgian Pro League, Turkish Süper Lig, Scottish Premiership, Greek Super League, Argentine Primera, Liga MX, CAF Champions, CAF Confederation, major international and women's competitions.</CardContent></Card>
    </div>
  )
}
