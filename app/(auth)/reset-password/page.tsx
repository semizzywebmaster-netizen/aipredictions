'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  return (
    <Card>
      <CardHeader><CardTitle>Set new password</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
        <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" />
        <Button className="w-full" disabled={!password || password !== confirm}>Update password</Button>
        <div className="text-[11px] text-muted-foreground text-center">Password reset via /api/v1/auth/reset-password • Security warnings • Recovery states</div>
      </CardContent>
    </Card>
  )
}
