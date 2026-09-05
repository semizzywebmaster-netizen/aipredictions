import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/ui/stat-card'

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Referrals, Rewards & Reward Wallet</h1>
      <div className="grid md:grid-cols-3 gap-4"><StatCard title="Referral Code" value="PUNTER123" description="Share link & code" /><StatCard title="Invited Users" value="24" description="Total invites" /><StatCard title="Rewards Earned" value="₦12,500" description="Cash + credits" /></div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Referral Dashboard</CardTitle></CardHeader><CardContent className="space-y-3"><div className="p-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-mono">https://punterprediction.com/r/PUNTER123</div><div className="flex gap-2"><Button size="sm">Copy Link</Button><Button size="sm" variant="outline">Share</Button></div><div className="text-xs text-muted-foreground">Referral link/code • Invited users • Rewards • Reward history • Referral status • Reward wallet • Analytics • Anti-fraud states via /api/v1/referrals/dashboard & code</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Reward Wallet</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{['+₦500 - John joined', '+100 credits - Sarah first deposit', '+₦1,000 - Mike subscription'].map((r,i) => <div key={i} className="p-2 rounded-lg border text-xs">{r}</div>)}</CardContent></Card>
      </div>
    </div>
  )
}
