'use client'
import { useEffect } from 'react'

export function useKeyboardShortcut(key: string, callback: () => void, deps: any[] = []) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        // avoid when typing in inputs
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, deps)
}

export function useEscapeKey(callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') callback() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [callback, enabled])
}
