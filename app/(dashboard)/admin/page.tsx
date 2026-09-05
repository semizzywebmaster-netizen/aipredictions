import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Complete Admin Dashboard</h1>
      <p className="text-sm text-muted-foreground">ONE Admin system. DO NOT CREATE MULTIPLE ADMIN ROLES. Dashboard, analytics, users, sports, leagues, competitions, fixtures, predictions, AI, subscriptions, wallet, payments, credits, referrals, ads, gamification, community, analysts, notifications, WhatsApp, settings, audit logs via /api/v1/admin/*</p>
      <div className="grid md:grid-cols-4 gap-4"><StatCard title="Total Users" value="12,450" /><StatCard title="Active Predictions" value="342" /><StatCard title="Revenue" value="₦2.4M" /><StatCard title="AI Queries" value="8,901" /></div>
      <div className="grid md:grid-cols-3 gap-4">
        {['Users','Sports','Leagues','Fixtures','Predictions','AI','Subscriptions','Wallet','Payments','Credits','Referrals','Ads','Gamification','Community','Analysts','Notifications','WhatsApp','Settings','Audit Logs'].map(m => <Card key={m}><CardContent className="p-4"><div className="text-sm font-medium">{m}</div><div className="text-xs text-muted-foreground">Management • API: /api/v1/admin/{m.toLowerCase()}</div></CardContent></Card>)}
      </div>
    </div>
  )
}
