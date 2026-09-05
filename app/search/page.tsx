'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SearchInput } from '@/components/ui/search-input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { SportBadge } from '@/components/common/sport-badge'
import { Search } from 'lucide-react'

const mockResults = {
  teams: [{ id: '1', name: 'Arsenal', sport: 'football' as const, league: 'Premier League' }, { id: '2', name: 'Lakers', sport: 'basketball' as const, league: 'NBA' }],
  players: [{ id: '1', name: 'Bukayo Saka', team: 'Arsenal', sport: 'football' as const }, { id: '2', name: 'LeBron James', team: 'Lakers', sport: 'basketball' as const }],
  leagues: [{ id: '1', name: 'Premier League', sport: 'football' as const }, { id: '2', name: 'NBA', sport: 'basketball' as const }],
  fixtures: [{ id: '1', home: 'Arsenal', away: 'Man City', sport: 'football' as const }, { id: '2', home: 'Lakers', away: 'Warriors', sport: 'basketball' as const }],
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const hasResults = query.length > 1

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold tracking-tight">Global Search</h1>
        <p className="text-sm text-muted-foreground mt-1">Search teams, players, leagues, fixtures, predictions, analysts, bet codes, community posts</p>
        <div className="mt-6">
          <SearchInput value={query} onChange={setQuery} placeholder="Search anything..." />
        </div>

        {!hasResults ? (
          <Card className="mt-6">
            <CardContent className="p-8 text-center">
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center"><Search className="h-6 w-6 text-muted-foreground" /></div>
              <div className="mt-3 font-medium">Search across both sports</div>
              <div className="mt-1 text-sm text-muted-foreground">Type at least 2 characters to search football and basketball data. Try &quot;Arsenal&quot;, &quot;NBA&quot;, &quot;Premier League&quot;.</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Arsenal', 'Lakers', 'Premier League', 'NBA', 'La Liga', 'EuroLeague'].map(t => <button key={t} onClick={() => setQuery(t)} className="px-3 py-1.5 rounded-full border bg-white dark:bg-slate-900 text-xs hover:bg-slate-50">{t}</button>)}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="mt-6">
            <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="teams">Teams</TabsTrigger><TabsTrigger value="players">Players</TabsTrigger><TabsTrigger value="leagues">Leagues</TabsTrigger><TabsTrigger value="fixtures">Fixtures</TabsTrigger></TabsList>
            <TabsContent value="all" className="space-y-6">
              <div>
                <div className="text-sm font-semibold mb-3">Teams</div>
                <div className="grid gap-2">{mockResults.teams.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).map(team => <Card key={team.id}><CardContent className="p-3 flex items-center justify-between"><div className="flex items-center gap-2"><SportBadge sport={team.sport} size="sm" /><span className="text-sm font-medium">{team.name}</span><span className="text-xs text-muted-foreground">{team.league}</span></div><span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Team</span></CardContent></Card>)}</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3">Leagues</div>
                <div className="grid gap-2">{mockResults.leagues.filter(l => l.name.toLowerCase().includes(query.toLowerCase())).map(league => <Card key={league.id}><CardContent className="p-3 flex items-center justify-between"><div className="flex items-center gap-2"><SportBadge sport={league.sport} size="sm" /><span className="text-sm font-medium">{league.name}</span></div><span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">League</span></CardContent></Card>)}</div>
              </div>
              {mockResults.teams.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).length === 0 && mockResults.leagues.filter(l => l.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <EmptyState title="No results" description={`No results for "${query}". Try different keywords or check football and basketball separately.`} icon={<Search className="h-6 w-6" />} />
              )}
            </TabsContent>
            <TabsContent value="teams"><div className="space-y-2">{mockResults.teams.map(t => <Card key={t.id}><CardContent className="p-3">{t.name} • {t.league}</CardContent></Card>)}</div></TabsContent>
            <TabsContent value="players"><div className="space-y-2">{mockResults.players.map(p => <Card key={p.id}><CardContent className="p-3">{p.name} • {p.team}</CardContent></Card>)}</div></TabsContent>
            <TabsContent value="leagues"><div className="space-y-2">{mockResults.leagues.map(l => <Card key={l.id}><CardContent className="p-3">{l.name}</CardContent></Card>)}</div></TabsContent>
            <TabsContent value="fixtures"><div className="space-y-2">{mockResults.fixtures.map(f => <Card key={f.id}><CardContent className="p-3">{f.home} vs {f.away}</CardContent></Card>)}</div></TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  )
}
