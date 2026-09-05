export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="hidden lg:flex flex-1 bg-slate-900 dark:bg-black text-white p-10 flex-col justify-between">
        <div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-orange-600 flex items-center justify-center font-bold">PP</div>
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-balance">Equal depth for football & basketball</h2>
          <p className="mt-3 text-slate-300">Professional prediction intelligence. No guaranteed wins, only analytical confidence and risk.</p>
        </div>
        <div className="text-xs text-slate-400">18+ | Bet Responsibly | API-first • No secrets in frontend</div>
      </div>
    </div>
  )
}
