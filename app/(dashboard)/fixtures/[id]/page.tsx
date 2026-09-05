import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge, ConfidenceBadge } from '@/components/common/sport-badge'
import { ConfidenceIndicator } from '@/components/common/confidence-indicator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function MatchCenter({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><SportBadge sport="football" /><h1 className="text-2xl font-bold">Match Center {params.id}</h1></div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card><CardContent className="p-6 text-center"><div className="flex items-center justify-center gap-8"><div className="text-center"><div className="h-12 w-12 rounded-full bg-emerald-100 mx-auto" /><div className="mt-2 font-semibold">Arsenal</div></div><div className="text-2xl font-bold">vs</div><div className="text-center"><div className="h-12 w-12 rounded-full bg-sky-100 mx-auto" /><div className="mt-2 font-semibold">Man City</div></div></div><div className="mt-4 text-sm text-muted-foreground">Premier League • Today 19:45 • Emirates Stadium • Live state, scores, timelines</div></CardContent></Card>
          <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="stats">Stats</TabsTrigger><TabsTrigger value="lineups">Lineups</TabsTrigger><TabsTrigger value="predictions">Predictions</TabsTrigger></TabsList>
            <TabsContent value="overview"><Card><CardContent className="p-6 text-sm text-muted-foreground">Match details, timeline, statistics, lineups where supplied by /api/v1/fixtures/{params.id}. Odds display, prediction access.</CardContent></Card></TabsContent>
            <TabsContent value="stats"><Card><CardContent className="p-6 text-sm">Statistics: possession, shots, xG, corners, cards, etc. Live-update-ready.</CardContent></Card></TabsContent>
            <TabsContent value="lineups"><Card><CardContent className="p-6 text-sm">Lineups where supplied • Formation • Injuries/suspensions</CardContent></Card></TabsContent>
            <TabsContent value="predictions"><Card><CardContent className="p-6 space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-medium">Home Win • 1X2</span><ConfidenceBadge confidence={82} /></div><ConfidenceIndicator confidence={82} /></CardContent></Card></TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4"><Card><CardHeader><CardTitle className="text-sm">Odds</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div className="flex justify-between"><span>Home</span><span className="font-mono">2.45</span></div><div className="flex justify-between"><span>Draw</span><span className="font-mono">3.20</span></div><div className="flex justify-between"><span>Away</span><span className="font-mono">2.85</span></div></CardContent></Card><Card><CardContent className="p-4 text-xs text-muted-foreground">Live-update architecture • WS ready via NEXT_PUBLIC_WS_URL</CardContent></Card></div>
      </div>
    </div>
  )
}
