'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full rounded-2xl border bg-white dark:bg-slate-900 p-8 text-center">
        <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 mx-auto flex items-center justify-center text-red-600">!</div>
        <h2 className="mt-4 font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error.message || 'An unexpected error occurred. Please try again.'}</p>
        <button onClick={reset} className="mt-6 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium">Try again</button>
        <div className="mt-4 text-[11px] text-muted-foreground">If the problem persists, contact support. 18+ Responsible betting.</div>
      </div>
    </div>
  )
}
