'use client'
import { useEffect, useRef } from 'react'

export function useFocusTrap(enabled = true) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    const focusable = el.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const handle = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    el.addEventListener('keydown', handle)
    first?.focus()
    return () => el.removeEventListener('keydown', handle)
  }, [enabled])
  return ref
}
