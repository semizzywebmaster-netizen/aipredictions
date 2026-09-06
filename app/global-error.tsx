'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('PUNTER PREDICTION global error', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <main className="min-h-screen flex items-center justify-center p-6">
          <section className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm dark:bg-slate-900">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 font-bold text-red-600 dark:bg-red-900/30">
              !
            </div>
            <h1 className="mt-4 text-lg font-semibold">PUNTER PREDICTION is temporarily unavailable</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              We could not load the application correctly. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
            >
              Try again
            </button>
            {error.digest ? (
              <p className="mt-3 text-[10px] text-slate-500 dark:text-slate-400">Reference: {error.digest}</p>
            ) : null}
            <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
              If the problem persists, contact support. 18+ Responsible betting.
            </p>
          </section>
        </main>
      </body>
    </html>
  )
}
