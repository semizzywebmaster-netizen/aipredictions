import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function WhatsAppPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">WhatsApp Linking & WhatsApp-Powered Experience</h1>
      <Card><CardHeader><CardTitle className="text-sm">Link WhatsApp</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">Frontend flows for WhatsApp linking, OTP, account status, QR/link placeholder, notification preferences, secure payment-link handoff, prediction access, bet-code access, AI assistant access. Actual WhatsApp Business Cloud API backend-owned via /api/v1/whatsapp/status, link, verify, preferences</div>
        <div><label className="text-sm font-medium">Phone Number</label><Input placeholder="+234..." /></div>
        <Button>Send OTP</Button>
        <div className="p-3 rounded-xl border bg-slate-50 text-xs">Account status: Not linked • QR placeholder where appropriate • Secure handoff for payments • Notification preferences: prediction alerts, match alerts via WhatsApp • Backend-owned API, no secrets in frontend</div>
        <div className="grid grid-cols-2 gap-3"><div className="p-3 rounded-xl border text-xs"><div className="font-medium">Notification Prefs</div><div className="mt-1 text-muted-foreground">Prediction alerts via WhatsApp • Match alerts • Payment alerts</div></div><div className="p-3 rounded-xl border text-xs"><div className="font-medium">Access</div><div className="mt-1 text-muted-foreground">Prediction access • Bet-code access • AI assistant access via WhatsApp</div></div></div>
      </CardContent></Card>
    </div>
  )
}
