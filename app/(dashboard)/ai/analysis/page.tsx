import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIReasoning } from '@/components/common/ai-reasoning'

export default function AIAnalysisPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Match/Team/Analyst Intelligence</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Match Analysis</CardTitle></CardHeader><CardContent className="space-y-3"><AIReasoning reasoning="Arsenal vs Man City: Home form W4 D1, xG 1.8, defensive injuries for away, odds movement -5.7%" blocks={[{ title: 'Team Form', content: 'Arsenal home strong, Man City away inconsistent', confidence: 75, type: 'form' }, { title: 'Statistical', content: 'xG difference +0.6 home', confidence: 80, type: 'statistical' }]} /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Team Analysis</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Team analysis, player analysis, analyst analysis, prediction explanation, statistics, confidence, risk, data-backed insights via /api/v1/ai/analyze/match, team</CardContent></Card>
      </div>
    </div>
  )
}
