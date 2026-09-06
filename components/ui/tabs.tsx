'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

interface TabsContextType {
  active: string
  setActive: (v: string) => void
}

const TabsContext = React.createContext<TabsContextType | null>(null)

export function Tabs({
  defaultValue,
  children,
  className,
}: TabsProps) {
  const [active, setActive] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn(className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground',
        className
      )}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function TabsTrigger({
  value,
  children,
  className,
  onClick,
}: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)

  if (!ctx) {
    throw new Error('TabsTrigger must be inside Tabs')
  }

  const isActive = ctx.active === value

  return (
    <button
      onClick={(event) => {
        ctx.setActive(value)
        onClick?.(event)
      }}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive && 'bg-background text-foreground shadow-sm',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(TabsContext)

  if (!ctx) {
    throw new Error('TabsContent must be inside Tabs')
  }

  if (ctx.active !== value) return null

  return (
    <div
      className={cn(
        'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </div>
  )
}
