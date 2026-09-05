import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FiltersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sports Filters, Date Navigation & Advanced Search</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Date Navigation</CardTitle></CardHeader><CardContent className="flex gap-2 flex-wrap">{['Today','Tomorrow','This Week','Live','Completed','Date Picker'].map(d => <button key={d} className="px-3 py-1.5 rounded-full border text-xs hover:bg-slate-50">{d}</button>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Filters</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div>League filter • Team filter • Market filter • Odds filter • Risk filter • Confidence filter • Sport filtering • Advanced search via /api/v1/fixtures?filters</div><div className="flex gap-2 flex-wrap">{['1X2','BTTS','Over/Under','Moneyline','Spread','Low Risk','High Confidence'].map(f => <span key={f} className="text-xs px-2 py-1 rounded-full bg-slate-100">{f}</span>)}</div></CardContent></Card>
      </div>
    </div>
  )
}
