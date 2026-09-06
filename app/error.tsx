'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('PUNTER PREDICTION route error', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full rounded-2xl border bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
        <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 mx-auto flex items-center justify-center text-red-600 font-bold">
          !
        </div>
        <h2 className="mt-4 font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load this page correctly. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium"
        >
          Try again
        </button>
        {error.digest && (
          <p className="mt-3 text-[10px] text-muted-foreground">Reference: {error.digest}</p>
        )}
        <div className="mt-4 text-[11px] text-muted-foreground">
          If the problem persists, contact support. 18+ Responsible betting.
        </div>
      </div>
    </div>
  )
}
