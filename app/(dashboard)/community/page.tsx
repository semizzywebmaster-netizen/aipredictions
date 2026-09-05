'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SportBadge } from '@/components/common/sport-badge'

export default function CommunityPage() {
  const [post, setPost] = useState('')
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Community Feed & Social Predictions</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card><CardContent className="p-4"><div className="flex gap-3"><div className="h-8 w-8 rounded-full bg-slate-200" /><Input value={post} onChange={e => setPost(e.target.value)} placeholder="Share a prediction, bet slip, or insight..." className="flex-1" /><Button>Post</Button></div><div className="mt-2 text-[11px] text-muted-foreground">Community feed • Prediction posts • Bet-slip sharing • Sport filters • API: /api/v1/community/posts</div></CardContent></Card>
          <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="football">Football</TabsTrigger><TabsTrigger value="basketball">Basketball</TabsTrigger><TabsTrigger value="trending">Trending</TabsTrigger></TabsList></Tabs>
          <div className="space-y-3">{[
            { id: '1', user: '@analystPro', sport: 'football' as const, content: 'Arsenal Over 1.5 + BTTS Yes double • Confidence 79% • My reasoning thread 🧵', likes: 24, comments: 5 },
            { id: '2', user: '@hoopsGuru', sport: 'basketball' as const, content: 'Lakers -3.5 Spread looking value today. Home form strong, Warriors injuries impact.', likes: 18, comments: 3 },
          ].map(p => <Card key={p.id}><CardContent className="p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="h-6 w-6 rounded-full bg-slate-200" /><span className="text-sm font-medium">{p.user}</span><SportBadge sport={p.sport} size="sm" /></div><span className="text-xs text-muted-foreground">2h ago</span></div><div className="mt-2 text-sm">{p.content}</div><div className="mt-3 flex gap-4 text-xs text-muted-foreground"><button>❤️ {p.likes} likes</button><button>💬 {p.comments} comments</button><button>🔖 Save</button><button>↗️ Share</button></div></CardContent></Card>)}</div>
        </div>
        <Card><CardHeader><CardTitle className="text-sm">Trending • Personalized</CardTitle></CardHeader><CardContent className="text-xs text-muted-foreground space-y-2"><div>Trending predictions • Personalized feed • Create post via /api/v1/community/feed?sport&trending</div><div className="mt-4 p-2 rounded-lg bg-slate-50 border">Community guidelines • Responsible sharing • No guaranteed wins</div></CardContent></Card>
      </div>
    </div>
  )
}
