'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('punter-theme') as Theme | null
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = (t: Theme) => {
      const resolved = t === 'system' ? (media.matches ? 'dark' : 'light') : t
      setResolvedTheme(resolved)
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      root.style.colorScheme = resolved
    }

    apply(theme)
    localStorage.setItem('punter-theme', theme)

    const listener = () => { if (theme === 'system') apply('system') }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
