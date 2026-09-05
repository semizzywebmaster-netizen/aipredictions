import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Payment Checkout, Verification & Subscription Management</h1>
      <Card><CardHeader><CardTitle>Checkout</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">Frontend architecture for Paystack and Flutterwave. Checkout, payment initialization, return handling, payment status, pending, failed, verification, subscription state, receipts via /api/v1/wallet/deposit and verify-deposit</div>
        <div className="grid grid-cols-2 gap-3"><Button variant="outline">Pay with Paystack</Button><Button variant="outline">Pay with Flutterwave</Button></div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">Never trust client-side payment success. Verification via backend /api/v1/wallet/verify-deposit. Webhook verification backend-owned.</div>
        <div className="space-y-2 text-xs"><div className="flex justify-between"><span>Amount</span><span className="font-mono">₦5,000</span></div><div className="flex justify-between"><span>Provider</span><span>Paystack</span></div><div className="flex justify-between"><span>Status</span><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Pending</span></div></div>
      </CardContent></Card>
    </div>
  )
}
