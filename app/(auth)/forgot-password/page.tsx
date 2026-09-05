'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <Card>
      <CardHeader><CardTitle>Reset password</CardTitle><p className="text-sm text-muted-foreground">We will send recovery instructions</p></CardHeader>
      <CardContent className="space-y-4">
        {!sent ? (
          <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
            <div><label className="text-sm font-medium">Email</label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
            <Button type="submit" className="w-full">Send reset link</Button>
          </form>
        ) : (
          <div className="text-sm">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">If an account exists for {email}, you will receive password reset instructions.</div>
            <div className="mt-4 text-xs text-muted-foreground">Check spam folder. OTP countdown and retry handled by backend /api/v1/auth/forgot-password</div>
          </div>
        )}
        <Link href="/login" className="block text-xs text-center text-primary hover:underline">Back to login</Link>
      </CardContent>
    </Card>
  )
}
