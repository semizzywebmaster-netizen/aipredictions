import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wallet, Credits & Transaction History</h1>
      <p className="text-sm text-muted-foreground">Maintain separate CASH WALLET and AI/PREDICTION CREDITS. Balances, deposits, withdrawals architecture, credit purchases, rewards, transaction history, details, filters, ledger via /api/v1/wallet</p>
      <div className="grid md:grid-cols-2 gap-4">
        <StatCard title="Cash Wallet" value="₦12,500" description="Available for withdrawals" />
        <StatCard title="AI/Prediction Credits" value="1,240" description="For AI queries & premium predictions" />
      </div>
      <Tabs defaultValue="transactions">
        <TabsList><TabsTrigger value="transactions">Transactions</TabsTrigger><TabsTrigger value="credits">Credits</TabsTrigger><TabsTrigger value="ledger">Ledger</TabsTrigger></TabsList>
        <TabsContent value="transactions"><Card><CardContent className="p-6 space-y-3">{[
          { id: '1', type: 'deposit', amount: '+₦5,000', status: 'completed', desc: 'Paystack deposit' },
          { id: '2', type: 'purchase', amount: '-200 credits', status: 'completed', desc: 'Premium prediction' },
          { id: '3', type: 'reward', amount: '+100 credits', status: 'completed', desc: 'Referral reward' },
        ].map(tx => <div key={tx.id} className="flex justify-between p-3 rounded-xl border text-sm"><div><div className="font-medium">{tx.desc}</div><div className="text-xs text-muted-foreground">{tx.type} • {tx.status}</div></div><div className="font-mono">{tx.amount}</div></div>)}</CardContent></Card></TabsContent>
        <TabsContent value="credits"><Card><CardContent className="p-6 text-sm text-muted-foreground">Credit packages • Purchase via Paystack/Flutterwave frontend architecture • Rewards • /api/v1/wallet/credits</CardContent></Card></TabsContent>
        <TabsContent value="ledger"><Card><CardContent className="p-6 text-sm text-muted-foreground">Full ledger with filters, transaction details, verification states</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  )
}
