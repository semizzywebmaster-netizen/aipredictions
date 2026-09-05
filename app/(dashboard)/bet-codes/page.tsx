'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function BetCodesPage() {
  const [code, setCode] = useState('')
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bet Codes: Generate, Import, Merge & Lookup</h1>
      <Tabs defaultValue="generate">
        <TabsList><TabsTrigger value="generate">Generate</TabsTrigger><TabsTrigger value="import">Import</TabsTrigger><TabsTrigger value="merge">Merge</TabsTrigger><TabsTrigger value="lookup">Lookup</TabsTrigger></TabsList>
        <TabsContent value="generate"><Card><CardContent className="p-6 space-y-3"><div className="text-sm text-muted-foreground">Generate bet code from selections via /api/v1/bet-codes/generate • Copy • Share</div><Button>Generate Code</Button></CardContent></Card></TabsContent>
        <TabsContent value="import"><Card><CardContent className="p-6 space-y-3"><Input value={code} onChange={e => setCode(e.target.value)} placeholder="Paste bet code" /><Button>Import Code</Button><div className="text-xs text-muted-foreground">Supports multiple providers • API: /api/v1/bet-codes/import</div></CardContent></Card></TabsContent>
        <TabsContent value="merge"><Card><CardContent className="p-6 space-y-3"><div className="text-sm">Merge multiple codes into one bet via /api/v1/bet-codes/merge • Optimize • Convert</div><Button>Merge Codes</Button></CardContent></Card></TabsContent>
        <TabsContent value="lookup"><Card><CardContent className="p-6 space-y-3"><Input placeholder="Enter code to lookup" /><Button>Lookup</Button><div className="text-xs text-muted-foreground">Lookup • Invalid state • Expired state • API: /api/v1/bet-codes/{'{code}'}</div></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  )
}
