import { cn } from '@/lib/utils'

export function EmptyState({ title='No data', description, icon, action, className }: { title?: string; description?: string; icon?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center', className)}>
      {icon && <div className="mb-4 h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-muted-foreground">{icon}</div>}
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function LoadingState({ title='Loading...', className }: { title?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border p-10', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-white" />
      <div className="mt-3 text-sm text-muted-foreground">{title}</div>
    </div>
  )
}

export function ErrorState({ title='Something went wrong', description, retry, className }: { title?: string; description?: string; retry?: () => void; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 dark:bg-red-950/20 p-10 text-center', className)}>
      <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">!</div>
      <h3 className="mt-3 font-semibold text-red-900 dark:text-red-100">{title}</h3>
      {description && <p className="mt-1 text-sm text-red-700/80 dark:text-red-300/80 max-w-sm">{description}</p>}
      {retry && <button onClick={retry} className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700">Try again</button>}
    </div>
  )
}
