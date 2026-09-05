'use client'
import { useTheme } from '@/providers/theme-provider'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="inline-flex rounded-xl border bg-white dark:bg-slate-900 p-1">
      <button onClick={() => setTheme('light')} className={`h-7 w-7 rounded-lg flex items-center justify-center ${theme === 'light' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800'}`} aria-label="Light theme"><Sun className="h-4 w-4" /></button>
      <button onClick={() => setTheme('dark')} className={`h-7 w-7 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800'}`} aria-label="Dark theme"><Moon className="h-4 w-4" /></button>
      <button onClick={() => setTheme('system')} className={`h-7 w-7 rounded-lg flex items-center justify-center ${theme === 'system' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800'}`} aria-label="System theme"><Monitor className="h-4 w-4" /></button>
    </div>
  )
}
