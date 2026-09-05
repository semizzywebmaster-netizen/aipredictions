'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function VerifyPhonePage() {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)
  useEffect(() => { if (countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t) } }, [countdown])
  return (
    <Card>
      <CardHeader><CardTitle>Verify phone</CardTitle><p className="text-sm text-muted-foreground">OTP sent via WhatsApp/SMS</p></CardHeader>
      <CardContent className="space-y-4">
        <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} />
        <Button className="w-full" disabled={otp.length !== 6}>Verify Phone</Button>
        <div className="text-xs text-center">{countdown > 0 ? `Retry in ${countdown}s` : <button onClick={() => setCountdown(60)} className="text-primary hover:underline">Resend OTP</button>}</div>
      </CardContent>
    </Card>
  )
}
