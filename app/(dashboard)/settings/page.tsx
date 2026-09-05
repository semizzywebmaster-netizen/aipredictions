import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Sessions, Devices, Privacy & Account Management</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">
          <div className="flex justify-between p-3 rounded-xl border bg-emerald-50 border-emerald-200"><span>Current • Lagos, Chrome, Windows</span><span className="text-xs text-emerald-700">Active now</span></div>
          <div className="flex justify-between p-3 rounded-xl border"><span>Lagos, Mobile Safari, 2 days ago</span><Button variant="outline" size="sm">Logout</Button></div>
          <Button variant="outline" size="sm">Logout other devices</Button>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Privacy Controls</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">
          <div className="flex justify-between items-center"><span>Profile visibility</span><span className="text-xs px-2 py-1 rounded-full bg-slate-100">Public</span></div>
          <div className="flex justify-between items-center"><span>Show prediction history</span><span className="text-xs px-2 py-1 rounded-full bg-slate-100">Yes</span></div>
          <div className="flex justify-between items-center"><span>Data export</span><Button variant="outline" size="sm">Request</Button></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Security Settings</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">
          <div>2FA UI: Optional TOTP • Security warnings • Login history via /api/v1/auth/sessions</div>
          <Button variant="outline" size="sm">Enable 2FA</Button>
        </CardContent></Card>
        <Card className="border-red-200"><CardHeader><CardTitle className="text-red-700">Danger Zone</CardTitle></CardHeader><CardContent className="space-y-3"><div className="text-sm text-muted-foreground">Account deletion is permanent. All data removed per privacy policy.</div><Button variant="destructive" size="sm">Delete account</Button></CardContent></Card>
      </div>
    </div>
  )
}
