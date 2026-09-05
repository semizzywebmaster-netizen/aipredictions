import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Advertising & Rewarded Ads</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Banner Ad Placement</CardTitle></CardHeader><CardContent><div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-muted-foreground">Sponsored Banner • 320x100</div><div className="mt-2 text-xs text-muted-foreground">Advertising placements • Banners • Native ads • Sponsored cards via /api/v1/ads/placements</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Rewarded Ad</CardTitle></CardHeader><CardContent className="space-y-3"><div className="p-3 rounded-xl border bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">Watch ad to earn 10 credits</div><Button size="sm" className="w-full">Watch Ad</Button><div className="text-xs text-muted-foreground">Rewarded ads • Reward progress • Ad availability • Frequency-limit messaging • No deceptive advertising • No fake earnings • API: /api/v1/ads/rewarded & claim</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Native Ad</CardTitle></CardHeader><CardContent><div className="p-3 rounded-xl border"><div className="text-xs font-medium">Sponsored • Football Analytics Tool</div><div className="text-[11px] text-muted-foreground mt-1">Professional stats for serious punters. Analytical only.</div></div></CardContent></Card>
      </div>
    </div>
  )
}
