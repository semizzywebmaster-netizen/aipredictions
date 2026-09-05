import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Saved Bets, Bet History & Sharing</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Saved Bets</CardTitle></CardHeader><CardContent className="space-y-3"><div className="p-3 rounded-xl border"><div className="text-sm font-medium">Arsenal Over 1.5 + Lakers ML</div><div className="text-xs text-muted-foreground">Total 3.51 odds • Saved 2h ago</div><div className="mt-2 flex gap-2"><Button size="sm" variant="outline">Share Card</Button><Button size="sm" variant="outline">Copy Code</Button></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Bet History</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">History • Share links • Social sharing • Copy bet code via /api/v1/bet-codes/history</CardContent></Card>
      </div>
      <Card><CardContent className="p-4 text-xs text-muted-foreground">Favorites, history, share cards, share links, social sharing architecture</CardContent></Card>
    </div>
  )
}
