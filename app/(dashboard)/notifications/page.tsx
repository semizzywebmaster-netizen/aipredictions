import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications & Communication Center</h1>
      <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="predictions">Predictions</TabsTrigger><TabsTrigger value="payments">Payments</TabsTrigger><TabsTrigger value="community">Community</TabsTrigger></TabsList></Tabs>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">{[
          { id: '1', type: 'prediction', title: 'High confidence prediction', desc: 'Arsenal vs Man City - Home Win 82% confidence', time: '2h ago' },
          { id: '2', type: 'payment', title: 'Deposit verified', desc: '₦5,000 deposit via Paystack verified', time: '5h ago' },
          { id: '3', type: 'community', title: 'New follower', desc: '@analystPro started following you', time: '1d ago' },
        ].map(n => <Card key={n.id}><CardContent className="p-4"><div className="flex justify-between"><div><div className="text-sm font-medium">{n.title}</div><div className="text-xs text-muted-foreground">{n.desc}</div></div><div className="text-xs text-muted-foreground">{n.time}</div></div></CardContent></Card>)}</div>
        <Card><CardHeader><CardTitle className="text-sm">Preferences</CardTitle></CardHeader><CardContent className="text-xs space-y-2 text-muted-foreground"><div>Push architecture • Email prefs • WhatsApp prefs • Prediction alerts • Match alerts • Payment alerts • Subscription alerts • Referral alerts • Community alerts • System notifications via /api/v1/notifications/preferences</div><div className="mt-4 space-y-1"><label className="flex justify-between"><span>Prediction alerts</span><span>✓</span></label><label className="flex justify-between"><span>WhatsApp</span><span>✓</span></label><label className="flex justify-between"><span>Email</span><span>✓</span></label></div></CardContent></Card>
      </div>
    </div>
  )
}
