export const designTokens = {
  colors: {
    football: { DEFAULT: '#059669', light: '#10b981', dark: '#047857', muted: '#ecfdf5', 50: '#ecfdf5', 100: '#d1fae5', 600: '#059669' },
    basketball: { DEFAULT: '#EA580C', light: '#fb923c', dark: '#c2410c', muted: '#fff7ed', 50: '#fff7ed', 100: '#ffedd5', 600: '#EA580C' },
    brand: { DEFAULT: '#0f172a', light: '#1e293b', accent: '#6366f1', muted: '#f8fafc' },
    semantic: { success: '#059669', warning: '#d97706', danger: '#dc2626', info: '#2563eb' },
  },
  radius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', '2xl': '1.5rem', full: '9999px' },
  spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem' },
  shadows: {
    soft: '0 2px 10px rgba(0,0,0,0.05)',
    medium: '0 4px 20px rgba(0,0,0,0.08)',
    large: '0 10px 40px rgba(0,0,0,0.12)',
    football: '0 4px 20px rgba(5,150,105,0.2)',
    basketball: '0 4px 20px rgba(234,88,12,0.2)',
  },
  typography: {
    fontSans: 'Inter, system-ui, -apple-system, sans-serif',
    fontMono: 'JetBrains Mono, monospace',
    sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' },
  },
} as const

export const sportVisualLanguage = {
  football: {
    gradient: 'from-emerald-600 to-emerald-700',
    lightGradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-500',
    shadow: 'shadow-emerald-100',
  },
  basketball: {
    gradient: 'from-orange-600 to-orange-700',
    lightGradient: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    ring: 'ring-orange-500',
    shadow: 'shadow-orange-100',
  },
}
