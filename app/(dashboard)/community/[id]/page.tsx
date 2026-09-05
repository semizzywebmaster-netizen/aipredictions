import { Card, CardContent } from '@/components/ui/card'

export default function CommunityPost({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Post {params.id}</h1>
      <Card><CardContent className="p-6 space-y-4">
        <div className="text-sm">Community post detail with comments, replies, likes, saves, reports, block/mute, moderation states, deleted-content states, community guidelines, abuse reporting via /api/v1/community/posts/{params.id}/comments, like, save, report</div>
        <div className="space-y-2">{['Great analysis!', 'What about injuries?', 'Followed your pick'].map((c,i) => <div key={i} className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm">{c}</div>)}</div>
        <div className="flex gap-2"><input placeholder="Write a comment..." className="flex-1 px-3 py-2 rounded-xl border text-sm" /><button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm">Reply</button></div>
        <div className="text-[11px] text-muted-foreground">Comments, replies, likes, saves, reports, moderation UI. No abusive content. 18+ Responsible.</div>
      </CardContent></Card>
    </div>
  )
}
