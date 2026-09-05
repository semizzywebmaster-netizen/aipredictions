import { ResponsiveContainer } from '@/components/layout/responsive-container'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 rounded-xl bg-slate-900 text-white">Skip to main content</a>
      <main id="main" className="min-h-screen">
        {children}
      </main>
    </div>
  )
}
