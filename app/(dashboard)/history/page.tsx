import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/ui/stat-card'

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Results, Accuracy & Prediction History</h1>
      <p className="text-sm text-muted-foreground">Never hide losses. Wins, losses, voids, accuracy, analytics, model performance, sport filters, league filters, date filters via /api/v1/predictions/history and /accuracy</p>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Predictions" value="1,248" description="All time" />
        <StatCard title="Accuracy" value="68.4%" description="Won / Total" trend="up" />
        <StatCard title="Football Accuracy" value="70.1%" sport="football" />
        <StatCard title="Basketball Accuracy" value="66.2%" sport="basketball" />
      </div>
      <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="won">Won</TabsTrigger><TabsTrigger value="lost">Lost</TabsTrigger><TabsTrigger value="void">Void</TabsTrigger></TabsList></Tabs>
      <Card><CardHeader><CardTitle className="text-sm">Prediction History</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">List with status, sport filters, league filters, date filters. Backend: /api/v1/predictions/history?page&limit&sport&status. Includes wins, losses, voids. Never hide losses.</CardContent></Card>
    </div>
  )
}
