import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2)
}

export function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount)
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', ...opts }).format(d)
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(d)
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len) + '...'
}

export function getSportColor(sport: string): string {
  switch(sport.toLowerCase()) {
    case 'football': return '#059669'
    case 'basketball': return '#EA580C'
    default: return '#6366f1'
  }
}
