'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SearchInput } from '@/components/ui/search-input'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const teams = [
  { id: 'ars', name: 'Arsenal', short: 'ARS', sport: 'football' as const, league: 'Premier League' },
  { id: 'lal', name: 'Lakers', short: 'LAL', sport: 'basketball' as const, league: 'NBA' },
]

export default function TeamsPage() {
  const [q, setQ] = useState('')
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teams, Players & Team Profiles</h1>
      <SearchInput value={q} onChange={setQ} placeholder="Search teams..." />
      <div className="grid md:grid-cols-3 gap-4">
        {teams.filter(t => t.name.toLowerCase().includes(q.toLowerCase())).map(team => (
          <Link key={team.id} href={`/teams/${team.id}`}><Card className="hover:shadow-md transition"><CardContent className="p-4"><div className="flex items-center justify-between"><SportBadge sport={team.sport} size="sm" /><span className="text-xs text-muted-foreground">{team.league}</span></div><div className="mt-3 font-semibold">{team.name}</div><div className="text-xs text-muted-foreground">{team.short} • Follow/save • Form • Roster • Recent matches</div></CardContent></Card></Link>
        ))}
      </div>
    </div>
  )
}
