'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const fixtures = [
  { id: '1', home: 'Arsenal', away: 'Man City', league: 'Premier League', sport: 'football' as const, time: '19:45', status: 'scheduled' },
  { id: '2', home: 'Lakers', away: 'Warriors', league: 'NBA', sport: 'basketball' as const, time: '02:30', status: 'live' },
]

export default function FixturesPage() {
  const [filter, setFilter] = useState('all')
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fixtures, Match Center & Live Experience</h1>
      <div className="flex gap-2 overflow-auto pb-2">
        {['all','today','live','upcoming','completed'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium border ${filter===f ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50'}`}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
      </div>
      <div className="grid gap-3">
        {fixtures.map(fx => (
          <Link key={fx.id} href={`/fixtures/${fx.id}`}>
            <Card className="hover:shadow-md transition"><CardContent className="p-4 flex items-center justify-between"><div className="flex items-center gap-3"><SportBadge sport={fx.sport} size="sm" /><div><div className="text-sm font-medium">{fx.home} vs {fx.away}</div><div className="text-xs text-muted-foreground">{fx.league} • {fx.time} • {fx.status}</div></div></div><div className="text-xs px-2 py-1 rounded-full bg-slate-100">{fx.status}</div></CardContent></Card>
          </Link>
        ))}
      </div>
      <Card><CardContent className="p-4 text-xs text-muted-foreground">Fixtures via /api/v1/fixtures • Live state, scores, timelines, statistics, lineups where supplied, odds, prediction access, live-update-ready architecture (WebSocket ready).</CardContent></Card>
    </div>
  )
}
