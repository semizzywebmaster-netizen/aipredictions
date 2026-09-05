import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="text-6xl font-bold tracking-tight">404</div>
        <div className="mt-2 font-medium">Page not found</div>
        <div className="mt-1 text-sm text-muted-foreground">The page you are looking for does not exist or was moved.</div>
        <div className="mt-6 flex gap-2 justify-center">
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm">Go home</Link>
          <Link href="/football" className="px-4 py-2 rounded-xl border bg-white dark:bg-slate-900 text-sm">Football</Link>
          <Link href="/basketball" className="px-4 py-2 rounded-xl border bg-white dark:bg-slate-900 text-sm">Basketball</Link>
        </div>
      </div>
    </div>
  )
}
