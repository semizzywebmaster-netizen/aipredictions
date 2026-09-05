import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminControlsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Feature Controls, Analytics & Management</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Feature Flags</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{[
          'Football Platform','Basketball Platform','AI Assistant','Bet Builder','Community','WhatsApp','Rewarded Ads','Referrals'
        ].map(f => <div key={f} className="flex justify-between items-center p-2 rounded-lg border"><span>{f}</span><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Enabled</span></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">AI Provider Settings</CardTitle></CardHeader><CardContent className="text-sm space-y-3"><div>Provider abstraction: enable/disable providers, priority, credit costs, usage limits via /api/v1/admin/feature-flags. Never expose provider secrets.</div><div className="p-2 rounded-lg border text-xs">Provider 1: Enabled • Priority 1 • Cost 10 credits/query</div><div className="p-2 rounded-lg border text-xs">Provider 2: Disabled • Priority 2</div><Button size="sm" variant="outline">Update Providers</Button></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Sports & Leagues Sync</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Enable/disable sports, leagues, competitions, sync controls, prediction settings via /api/v1/admin/* • Dynamic leagues support</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Analytics & Audit Logs</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Analytics dashboard • Usage analytics • Audit logs via /api/v1/admin/analytics & audit-logs • Never expose secrets</CardContent></Card>
      </div>
    </div>
  )
}
