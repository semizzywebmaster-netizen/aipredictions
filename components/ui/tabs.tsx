interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function TabsTrigger({ value, children, className, onClick }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be inside Tabs')
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
