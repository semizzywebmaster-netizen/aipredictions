import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SportBadge } from '@/components/common/sport-badge'
import Link from 'next/link'

const analysts = [
  { id: '1', name: 'Analyst Pro', username: '@analystPro', verified: true, accuracy: 72.4, sport: 'football' as const, followers: 1240 },
  { id: '2', name: 'Hoops Guru', username: '@hoopsGuru', verified: true, accuracy: 68.9, sport: 'basketball' as const, followers: 890 },
]

export default function AnalystsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analyst Profiles, Following & Leaderboards</h1>
      <div className="grid md:grid-cols-3 gap-4">{analysts.map(a => <Link key={a.id} href={`/analysts/${a.id}`}><Card className="hover:shadow-md transition"><CardContent className="p-4"><div className="flex items-center justify-between"><SportBadge sport={a.sport} size="sm" />{a.verified && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Verified</span>}</div><div className="mt-3 font-semibold">{a.name}</div><div className="text-xs text-muted-foreground">{a.username} • {a.followers} followers</div><div className="mt-2 text-sm font-medium">{a.accuracy}% accuracy</div></CardContent></Card></Link>)}</div>
      <Card><CardHeader><CardTitle className="text-sm">Leaderboards</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Analyst leaderboard • Sport-specific rankings • Accuracy • History • Followers • Following via /api/v1/analysts/leaderboard?sport • Verified analyst badge • Analyst statistics</CardContent></Card>
    </div>
  )
}
