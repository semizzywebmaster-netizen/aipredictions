'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'football' | 'basketball'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

const variantClasses = {
  default: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  football: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100',
  basketball: 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100',
}

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-11 rounded-xl px-8',
  icon: 'h-10 w-10',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant='default', size='default', loading, children, disabled, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variantClasses[variant], sizeClasses[size], className)} disabled={disabled || loading} {...props}>
      {loading && <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
      {children}
    </button>
  )
})
Button.displayName = 'Button'
