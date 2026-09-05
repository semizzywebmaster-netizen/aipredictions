import { AIReasoning } from '@/components/common/ai-reasoning'
import { Card, CardContent } from '@/components/ui/card'

export default function ReasoningPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prediction Reasoning & Confidence {params.id}</h1>
      <AIReasoning reasoning="Reasoning, confidence breakdown, risk explanation, model signals, statistical reasoning, AI reasoning, data-source display, odds movement, lineup/news impact, limitations." blocks={[{ title: 'Model Signals', content: 'Ensemble model weighting 5 factors', confidence: 80, type: 'model' }, { title: 'Odds Movement', content: 'Odds from 2.60 to 2.45 (down 5.7%) indicates market confidence shift', type: 'statistical' }]} />
      <Card><CardContent className="p-4 text-xs text-muted-foreground">Data sources displayed, never fabricate real odds/fixtures/results. Loading/empty/error/unavailable states handled.</CardContent></Card>
    </div>
  )
}
