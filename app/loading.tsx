export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-emerald-600 to-orange-600 animate-pulse" />
        <div className="mt-3 text-sm font-medium">Loading PUNTER PREDICTION...</div>
        <div className="mt-1 text-xs text-muted-foreground">Football • Basketball • Equal Depth</div>
        <div className="mt-4 h-1 w-32 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full w-1/2 bg-slate-900 dark:bg-white animate-[slide_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}
