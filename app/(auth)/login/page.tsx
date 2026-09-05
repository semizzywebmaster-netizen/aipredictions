'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // API call via authService - would be /api/v1/auth/login
      // const res = await authService.login({ email, password })
      await new Promise(r => setTimeout(r, 800))
      if (!email || !password) throw new Error('Please enter email and password')
      // Simulate success - in real app store tokens
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Welcome back</CardTitle><p className="text-sm text-muted-foreground">Login to PUNTER PREDICTION</p></CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <div><label className="text-sm font-medium">Email</label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
          <div><label className="text-sm font-medium">Password</label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></div>
          <Button type="submit" className="w-full" loading={loading}>Login</Button>
          <div className="flex justify-between text-xs">
            <Link href="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            <Link href="/register" className="text-primary hover:underline">Create account</Link>
          </div>
          <div className="pt-2 text-[11px] text-muted-foreground text-center">Social login architecture ready • Backend auth only • 18+ Responsible</div>
        </form>
      </CardContent>
    </Card>
  )
}
