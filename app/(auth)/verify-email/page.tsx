'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(60)
  useEffect(() => { if (countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t) } }, [countdown])
  return (
    <Card>
      <CardHeader><CardTitle>Verify email</CardTitle><p className="text-sm text-muted-foreground">Enter code sent to your email</p></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {[0,1,2,3,4,5].map(i => <Input key={i} maxLength={1} className="text-center" value={code[i] || ''} onChange={e => { const newCode = code.split(''); newCode[i] = e.target.value; setCode(newCode.join('').slice(0,6)) }} />)}
        </div>
        <Button className="w-full" disabled={code.length !== 6}>Verify</Button>
        <div className="text-xs text-center text-muted-foreground">
          {countdown > 0 ? `Resend in ${countdown}s` : <button onClick={() => setCountdown(60)} className="text-primary hover:underline">Resend code</button>}
        </div>
        <div className="text-[11px] text-center text-muted-foreground">Email verification via /api/v1/auth/verify-email • OTP countdown • Retry states</div>
      </CardContent>
    </Card>
  )
}
