import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalystDetail({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analyst {params.id}</h1>
      <Card><CardContent className="p-6 text-sm text-muted-foreground">Analyst profile: verified badge, statistics, accuracy, history, followers, following via /api/v1/analysts/{params.id} and predictions. Follow/unfollow via /follow.</CardContent></Card>
      <Card><CardHeader><CardTitle className="text-sm">Recent Predictions</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Predictions via /api/v1/analysts/{params.id}/predictions • Accuracy tracking • Never hide losses</CardContent></Card>
    </div>
  )
}
