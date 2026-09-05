import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge, ConfidenceBadge, RiskBadge } from '@/components/common/sport-badge'
import { ConfidenceIndicator } from '@/components/common/confidence-indicator'
import { AIReasoning } from '@/components/common/ai-reasoning'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function PredictionDetail({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><SportBadge sport="football" /><h1 className="text-2xl font-bold">Prediction {params.id}</h1><ConfidenceBadge confidence={82} /><RiskBadge risk="medium" /></div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card><CardHeader><CardTitle>Match Prediction Experience</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div>Teams: Arsenal vs Man City • Fixture: Premier League • Date: Today 19:45</div><div>Market: 1X2 • Outcome: Home Win • Odds: 2.45</div><div>Form, H2H, home/away performance, statistics, AI insights via /api/v1/predictions/{params.id}</div><ConfidenceIndicator confidence={82} /></CardContent></Card>
          <AIReasoning reasoning="Based on home form W4 D1, xG 1.8 vs 1.2, defensive injuries for away team. Estimated probability 58% for Home Win, analytical confidence 82% Medium-High, risk Medium. Data sources: form, H2H, lineup news impact. Limitations: odds movement, late injuries." blocks={[{ title: 'Form Analysis', content: 'Arsenal home: W4 D1 L0 last 5, xG 1.8, Man City away W2 D1 L2', confidence: 75, type: 'form' }, { title: 'Statistical Edge', content: 'Home advantage 0.35 xG, defensive injuries impact +0.2', confidence: 82, type: 'statistical' }]} />
          <Tabs defaultValue="reasoning"><TabsList><TabsTrigger value="reasoning">Reasoning</TabsTrigger><TabsTrigger value="stats">Statistics</TabsTrigger><TabsTrigger value="h2h">H2H</TabsTrigger></TabsList>
            <TabsContent value="reasoning"><Card><CardContent className="p-4 text-sm text-muted-foreground">Detailed reasoning, confidence breakdown, risk explanation, model signals, statistical reasoning, AI reasoning, data-source display, odds movement, lineup/news impact, limitations. Never claim guaranteed wins.</CardContent></Card></TabsContent>
            <TabsContent value="stats"><Card><CardContent className="p-4 text-sm">Home/Away performance, form, statistics via backend</CardContent></Card></TabsContent>
            <TabsContent value="h2h"><Card><CardContent className="p-4 text-sm">Head-to-head where applicable • Home/away • Last 5</CardContent></Card></TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4"><Card><CardHeader><CardTitle className="text-sm">Prediction Summary</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div className="flex justify-between"><span>Market</span><span className="font-medium">1X2</span></div><div className="flex justify-between"><span>Pick</span><span className="font-medium">Home Win</span></div><div className="flex justify-between"><span>Odds</span><span className="font-mono">2.45</span></div><div className="flex justify-between"><span>Confidence</span><span>82% High</span></div><div className="flex justify-between"><span>Risk</span><span>Medium</span></div></CardContent></Card><Card><CardContent className="p-4 text-xs text-muted-foreground">API: /api/v1/predictions/{params.id} • Includes fixture, teams, markets, odds, confidence, risk, form, H2H, statistics, AI insights</CardContent></Card></div>
      </div>
    </div>
  )
}
