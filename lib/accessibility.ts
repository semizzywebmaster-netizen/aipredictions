export const a11y = {
  skipToContent: 'Skip to main content',
  closeDialog: 'Close dialog',
  openMenu: 'Open navigation menu',
  closeMenu: 'Close navigation menu',
  toggleTheme: 'Toggle theme',
}

export function getAriaLabelForConfidence(confidence: number): string {
  if (confidence >= 90) return `Very high analytical confidence at ${confidence} percent`
  if (confidence >= 80) return `High analytical confidence at ${confidence} percent`
  if (confidence >= 60) return `Medium analytical confidence at ${confidence} percent`
  return `Low analytical confidence at ${confidence} percent`
}

export function getAriaLabelForRisk(risk: 'low' | 'medium' | 'high'): string {
  const map = { low: 'Low risk prediction', medium: 'Medium risk prediction', high: 'High risk prediction' }
  return map[risk]
}
