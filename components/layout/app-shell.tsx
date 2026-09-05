import { Header } from './header'
import { Sidebar } from './sidebar'
import { BottomNav } from './bottom-nav'

export function AppShell({ children, showSidebar = true }: { children: React.ReactNode; showSidebar?: boolean }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>
}
