import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const plans = [
  { id: 'free', name: 'Free', price: '₦0', features: ['5 predictions/day', 'Basic stats', 'Community read-only'], popular: false },
  { id: 'basic', name: 'Basic', price: '₦2,500/mo', features: ['50 predictions/day', 'Advanced stats', 'Bet builder', 'AI chat limited'], popular: true },
  { id: 'premium', name: 'Premium', price: '₦5,000/mo', features: ['Unlimited predictions', 'All markets', 'Full AI assistant', 'Priority support', 'Analyst access'], popular: false },
]

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pricing, Plans & Subscription UI</h1>
      <p className="text-sm text-muted-foreground">Configurable plans: Free, Basic, Premium, admin-defined. Feature comparison, monthly/yearly billing, upgrade, downgrade, cancellation, renewal, current plan via /api/v1/subscriptions/plans and current</p>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.id} className={plan.popular ? 'border-2 border-slate-900 dark:border-white' : ''}><CardHeader><CardTitle className="flex items-center justify-between"><span>{plan.name}</span>{plan.popular && <span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-white">Popular</span>}</CardTitle><div className="text-2xl font-bold">{plan.price}</div></CardHeader><CardContent className="space-y-3"><ul className="space-y-1.5 text-sm">{plan.features.map(f => <li key={f} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-slate-900" />{f}</li>)}</ul><Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.id === 'free' ? 'Current Plan' : 'Upgrade'}</Button></CardContent></Card>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-slate-50 border text-xs text-muted-foreground">Do not hard-code final production prices. Backend defines via /api/v1/subscriptions/plans. Billing: monthly/yearly toggle, upgrade, downgrade, cancellation, renewal.</div>
    </div>
  )
}
