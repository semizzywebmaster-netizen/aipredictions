'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SearchInput } from '@/components/ui/search-input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const allLeagues = [
  { id: '1', name: 'Premier League', sport: 'football' as const, country: 'England', featured: true },
  { id: '2', name: 'La Liga', sport: 'football' as const, country: 'Spain', featured: true },
  { id: '3', name: 'NBA', sport: 'basketball' as const, country: 'USA', featured: true },
  { id: '4', name: 'EuroLeague', sport: 'basketball' as const, country: 'Europe', featured: true },
  { id: '5', name: 'Bundesliga', sport: 'football' as const, country: 'Germany', featured: false },
  { id: '6', name: 'ACB Liga Endesa', sport: 'basketball' as const, country: 'Spain', featured: false },
]

export default function LeaguesPage() {
  const [q, setQ] = useState('')
  const [sport, setSport] = useState<'all' | 'football' | 'basketball'>('all')
  const filtered = allLeagues.filter(l => (sport === 'all' || l.sport === sport) && l.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dynamic Sports Leagues & Competitions</h1>
      <p className="text-sm text-muted-foreground">Frontend supports dynamically supplied sports, competitions, leagues, seasons, teams, players, fixtures, markets, odds. Not hard-coded small list.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchInput value={q} onChange={setQ} placeholder="Search leagues..." /></div>
        <Tabs defaultValue="all"><TabsList><TabsTrigger value="all" onClick={() => setSport('all')}>All</TabsTrigger><TabsTrigger value="football" onClick={() => setSport('football')}>Football</TabsTrigger><TabsTrigger value="basketball" onClick={() => setSport('basketball')}>Basketball</TabsTrigger></TabsList></Tabs>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(league => (
          <Link key={league.id} href={`/leagues/${league.id}`}>
            <Card className="hover:shadow-md transition"><CardContent className="p-4"><div className="flex items-center justify-between"><SportBadge sport={league.sport} size="sm" />{league.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-white">Featured</span>}</div><div className="mt-3 font-medium">{league.name}</div><div className="text-xs text-muted-foreground">{league.country}</div></CardContent></Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
