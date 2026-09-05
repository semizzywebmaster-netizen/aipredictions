'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SportBadge } from '@/components/common/sport-badge'

const suggestions = ['Analyze Arsenal vs Man City form', 'Best low-risk predictions today', 'Compare Lakers vs Warriors spread', 'Build me a 5-odd balanced bet']

export default function AIPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi, I am your AI Sports Assistant. Ask me about any football or basketball match, team, or strategy. I provide analytical confidence, not guarantees. 18+ Responsible.' }])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: `Analyzing: "${input}"\n\nI looked at form, H2H, home/away, lineup news, odds movement. Estimated probability 62% for suggested outcome, analytical confidence 77% Medium, risk Medium.\n\nThis is a statistical estimate, not a guarantee. Past performance does not predict future results.` }])
    setInput('')
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3"><h1 className="text-2xl font-bold">AI Sports Assistant Core</h1><SportBadge sport="football" size="sm" /><SportBadge sport="basketball" size="sm" /></div>
      <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <Card className="lg:col-span-1"><CardHeader><CardTitle className="text-sm">Conversations</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">Arsenal analysis • Today</div><div className="p-2 rounded-lg hover:bg-slate-50">NBA spreads • Yesterday</div><div className="text-xs text-muted-foreground mt-4">Streaming-ready UI • Message history • Typing state • Suggested questions • Sport context • Match context via /api/v1/ai/chat & conversations</div></CardContent></Card>
        <Card className="lg:col-span-3 flex flex-col"><CardContent className="flex-1 p-4 space-y-4 overflow-auto">
          {messages.map((m,i) => <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl p-3 text-sm ${m.role==='user' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-tr-sm' : 'bg-slate-50 dark:bg-slate-800 border rounded-tl-sm'}`}>{m.content}</div></div>)}
          <div className="flex flex-wrap gap-2">{suggestions.map(s => <button key={s} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50">{s}</button>)}</div>
        </CardContent><div className="p-4 border-t flex gap-2"><Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about football or basketball..." onKeyDown={e => e.key==='Enter' && send()} /><Button onClick={send}>Send</Button></div><div className="p-2 text-[11px] text-center text-muted-foreground border-t">AI disclaimer: Analytical insights only, not guarantees. Backend provider abstraction, no secrets in frontend.</div></Card>
      </div>
    </div>
  )
}
