import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'

export default function GamificationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gamification</h1>
      <div className="grid md:grid-cols-4 gap-4"><StatCard title="XP" value="2,450" description="Level 12" /><StatCard title="Daily Streak" value="7 days" description="Keep it up!" /><StatCard title="Badges" value="12" description="Earned" /><StatCard title="Leaderboard Rank" value="#342" description="Top 15%" /></div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm">Badges & Achievements</CardTitle></CardHeader><CardContent className="grid grid-cols-4 gap-3">{['First Prediction','5 Wins','Football Expert','Basketball Pro','Streak 7','Community Star','AI Explorer','Bet Builder'].map(b => <div key={b} className="h-16 rounded-xl border bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[10px] text-center p-1">{b}</div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Challenges & Leaderboards</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div>Daily challenges • Prediction streaks • Rewards • Progress • Leaderboards via /api/v1/gamification/leaderboard, badges, challenges, streak</div><div className="space-y-1">{['Predict 3 today - 50 XP','Win 2 in a row - 100 XP','Share a bet - 25 XP'].map(c => <div key={c} className="p-2 rounded-lg border text-xs">{c}</div>)}</div></CardContent></Card>
      </div>
    </div>
  )
}
