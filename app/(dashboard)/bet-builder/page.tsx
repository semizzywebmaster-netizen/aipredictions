'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const mockSelections = [
  { id: '1', fixture: 'Arsenal vs Man City', market: 'Over 1.5', odds: 1.85, sport: 'football', confidence: 72 },
  { id: '2', fixture: 'Lakers vs Warriors', market: 'Lakers -3.5', odds: 1.90, sport: 'basketball', confidence: 68 },
]

export default function BetBuilderPage() {
  const [selections, setSelections] = useState(mockSelections)
  const [stake, setStake] = useState(1000)
  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1)
  const estReturn = stake * totalOdds
  const avgConf = selections.length ? Math.round(selections.reduce((a,s) => a+s.confidence,0)/selections.length) : 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Smart Bet Builder</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="football"><TabsList><TabsTrigger value="football">Football</TabsTrigger><TabsTrigger value="basketball">Basketball</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList></Tabs>
          <Card><CardHeader><CardTitle className="text-sm">Selection Builder</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">Market selection, odds display, selection management, validation, stake, estimated return, confidence, risk via /api/v1/bet-builder/build & validate</div>
            <div className="grid gap-2">{selections.map(s => <div key={s.id} className="flex items-center justify-between p-3 rounded-xl border"><div><div className="text-sm font-medium">{s.fixture}</div><div className="text-xs text-muted-foreground">{s.market} • {s.confidence}% conf</div></div><div className="flex items-center gap-2"><span className="font-mono text-sm">{s.odds.toFixed(2)}</span><button onClick={() => setSelections(selections.filter(x => x.id !== s.id))} className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center">×</button></div></div>)}</div>
            <div className="flex gap-2"><Input placeholder="Add fixture..." className="flex-1" /><Button>Add</Button></div>
          </CardContent></Card>
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle className="text-sm">Bet Slip</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="text-sm"><div className="flex justify-between"><span>Selections</span><span>{selections.length}</span></div><div className="flex justify-between font-semibold"><span>Total Odds</span><span className="font-mono">{totalOdds.toFixed(2)}</span></div><div className="flex justify-between text-xs text-muted-foreground"><span>Avg Confidence</span><span>{avgConf}%</span></div></div>
            <div><label className="text-xs font-medium">Stake</label><Input type="number" value={stake} onChange={e => setStake(Number(e.target.value))} /></div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><div className="flex justify-between text-sm font-semibold"><span>Est. Return</span><span className="font-mono">₦{estReturn.toLocaleString()}</span></div><div className="text-[11px] text-muted-foreground">Not guaranteed • Analytical only</div></div>
            <Button className="w-full">Save Bet</Button>
            <div className="text-[11px] text-muted-foreground text-center">Validation via /api/v1/bet-builder/validate • Estimated return not guaranteed</div>
          </CardContent></Card>
        </div>
      </div>
    </div>
  )
}
