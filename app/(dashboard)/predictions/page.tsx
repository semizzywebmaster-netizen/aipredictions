'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SearchInput } from '@/components/ui/search-input'
import { SportBadge, ConfidenceBadge, RiskBadge } from '@/components/common/sport-badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const predictions = [
  { id: '1', fixture: 'Arsenal vs Man City', league: 'Premier League', sport: 'football' as const, market: '1X2', pick: 'Home', confidence: 82, risk: 'medium' as const, odds: 2.45 },
  { id: '2', fixture: 'Lakers vs Warriors', league: 'NBA', sport: 'basketball' as const, market: 'Spread', pick: 'Lakers -3.5', confidence: 76, risk: 'low' as const, odds: 1.90 },
  { id: '3', fixture: 'Real Madrid vs Barca', league: 'La Liga', sport: 'football' as const, market: 'BTTS', pick: 'Yes', confidence: 88, risk: 'low' as const, odds: 1.75 },
]

export default function PredictionsPage() {
  const [q, setQ] = useState('')
  const [sport, setSport] = useState<'all' | 'football' | 'basketball'>('all')
  const filtered = predictions.filter(p => (sport==='all' || p.sport===sport) && p.fixture.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prediction Discovery & Dashboard</h1>
      <p className="text-sm text-muted-foreground">Recommended, high-confidence, low-risk, sport tabs, league filters, categories, sorting, search, pagination via /api/v1/predictions</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchInput value={q} onChange={setQ} placeholder="Search predictions..." /></div>
        <Tabs defaultValue="all"><TabsList><TabsTrigger value="all" onClick={() => setSport('all')}>All</TabsTrigger><TabsTrigger value="football" onClick={() => setSport('football')}>Football</TabsTrigger><TabsTrigger value="basketball" onClick={() => setSport('basketball')}>Basketball</TabsTrigger></TabsList></Tabs>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <Link key={p.id} href={`/predictions/${p.id}`}>
            <Card className="hover:shadow-md transition"><CardContent className="p-4"><div className="flex items-center justify-between"><SportBadge sport={p.sport} size="sm" /><span className="text-xs text-muted-foreground">{p.league}</span></div><div className="mt-2 text-sm font-medium">{p.fixture}</div><div className="mt-1 text-xs">{p.market} • {p.pick} @ {p.odds}</div><div className="mt-3 flex items-center gap-2"><ConfidenceBadge confidence={p.confidence} /><RiskBadge risk={p.risk} /></div></CardContent></Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
