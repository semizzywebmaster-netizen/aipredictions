'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await new Promise(r => setTimeout(r, 800))
      if (!form.email || !form.password) throw new Error('Email and password required')
      window.location.href = '/verify-email'
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Create account</CardTitle><p className="text-sm text-muted-foreground">Join football & basketball intelligence</p></CardHeader>
      <CardContent>
        <form onSubmit={handle} className="space-y-4">
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <div><label className="text-sm font-medium">Username</label><Input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="punter123" required /></div>
          <div><label className="text-sm font-medium">Email</label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required /></div>
          <div><label className="text-sm font-medium">Phone (optional)</label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+234..." /></div>
          <div><label className="text-sm font-medium">Password</label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required /></div>
          <Button type="submit" className="w-full" loading={loading}>Create account</Button>
          <div className="text-xs text-center text-muted-foreground">By signing up, you agree to Terms & Privacy. 18+ only.</div>
          <div className="text-xs text-center"><Link href="/login" className="text-primary hover:underline">Already have account? Login</Link></div>
        </form>
      </CardContent>
    </Card>
  )
}
