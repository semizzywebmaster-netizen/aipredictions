import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge } from '@/components/common/sport-badge'

export default function LeagueDetail({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><SportBadge sport="football" /><h1 className="text-2xl font-bold">League {params.id}</h1></div>
      <Card><CardHeader><CardTitle>Competition Page</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Season selection, featured competitions, search, filters, sport filtering, dynamically loaded competitions. Data via /api/v1/leagues/{params.id} • standings, fixtures, stats.</CardContent></Card>
      <div className="grid md:grid-cols-2 gap-4"><Card><CardContent className="p-4 text-sm">Standings table • API: /api/v1/leagues/{params.id}/standings</CardContent></Card><Card><CardContent className="p-4 text-sm">Fixtures • API: /api/v1/leagues/{params.id}/fixtures</CardContent></Card></div>
    </div>
  )
}
