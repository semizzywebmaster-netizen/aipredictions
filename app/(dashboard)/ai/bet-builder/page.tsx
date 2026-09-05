import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AIBetBuilderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Bet Builder, Bet Code & Conversation Experience</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="text-sm">AI Workflows</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div>• Build bet from natural language: &quot;Build me a balanced 5-odd bet for tonight&quot;</div><div>• Optimize bet: &quot;Optimize for low risk&quot;</div><div>• Explain bet: &quot;Why is this pick high confidence?&quot;</div><div>• Analyze bet code: &quot;Analyze code XYZ&quot;</div><div>• Convert selections, lookup prediction, compare options, follow-up conversation</div><div className="mt-4 p-3 rounded-xl bg-slate-50 border text-xs">API-first only: /api/v1/ai/bet-builder, /explain/prediction • Streaming-ready UI • No secrets in frontend</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Example Conversation</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div className="p-2 rounded-lg bg-slate-50">User: Build balanced 10 odds</div><div className="p-2 rounded-lg bg-slate-900 text-white">AI: Here is a balanced strategy: Arsenal Over 1.5 @1.85 (72%), Lakers -3.5 @1.90 (68%), Real BTTS @1.75 (75%) = 6.15 total, target 10 needs +1 pick...</div></CardContent></Card>
      </div>
    </div>
  )
}
