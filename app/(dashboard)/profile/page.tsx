'use client'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function ProfilePage() {
  const [prefs, setPrefs] = useState({ sport: 'both', notifications: true, language: 'en', timezone: 'Africa/Lagos' })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile & Account Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="preferences">Sports Prefs</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="responsible">Responsible</TabsTrigger></TabsList>
        <TabsContent value="profile">
          <Card><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center gap-4"><Avatar className="h-16 w-16"><AvatarFallback>PP</AvatarFallback></Avatar><Button variant="outline" size="sm">Change avatar</Button></div>
            <div className="grid sm:grid-cols-2 gap-4"><div><label className="text-sm font-medium">Username</label><Input defaultValue="punter_pro" /></div><div><label className="text-sm font-medium">Email</label><Input defaultValue="you@example.com" /></div><div><label className="text-sm font-medium">Phone</label><Input defaultValue="+234..." /></div><div><label className="text-sm font-medium">Location</label><Input defaultValue="Lagos, NG" /></div></div>
            <Button>Save changes</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card><CardContent className="p-6 space-y-4">
            <div><label className="text-sm font-medium">Favorite Sports</label><div className="mt-2 flex gap-2"><button className="px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 text-sm">Football</button><button className="px-3 py-1.5 rounded-full border bg-orange-50 text-orange-700 text-sm">Basketball</button><button className="px-3 py-1.5 rounded-full border bg-slate-900 text-white text-sm">Both (Equal)</button></div></div>
            <div><label className="text-sm font-medium">Prediction Preferences</label><div className="mt-2 text-xs text-muted-foreground">Preferred markets, confidence threshold, risk tolerance. Backend sync via /api/v1/users/preferences</div></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="notifications"><Card><CardContent className="p-6 text-sm text-muted-foreground">Notification preferences: prediction alerts, match alerts, payment alerts, community alerts, email/push/whatsapp. Synced via /api/v1/notifications/preferences</CardContent></Card></TabsContent>
        <TabsContent value="responsible"><Card><CardContent className="p-6"><div className="text-sm font-medium">Responsible Betting Settings</div><div className="mt-2 text-xs text-muted-foreground">Set deposit limits, loss limits, session reminders, self-exclusion options. 18+ only.</div><div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">We provide analytical insights, not guarantees. Never bet more than you can afford to lose.</div></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  )
}
