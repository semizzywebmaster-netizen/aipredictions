// Public env only - never secrets.
// NEXT_PUBLIC_* values are embedded into the browser bundle by Next.js.

function publicUrl(name: string, fallback: string, requiredInProduction = false): string {
  const value = process.env[name]?.trim()
  if (value) return value.replace(/\/$/, '')

  if (requiredInProduction && process.env.NODE_ENV === 'production') {
    throw new Error(`${name} is required for production builds`)
  }

  return fallback
}

export const env = {
  apiUrl: publicUrl('NEXT_PUBLIC_API_URL', 'http://localhost:8000/api/v1', true),
  appUrl: publicUrl('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  wsUrl: publicUrl('NEXT_PUBLIC_WS_URL', 'ws://localhost:8000'),
  appName: process.env.NEXT_PUBLIC_APP_NAME?.trim() || 'PUNTER PREDICTION',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION?.trim() || '1.0.0',
  enablePwa: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  enableFootball: process.env.NEXT_PUBLIC_ENABLE_FOOTBALL !== 'false',
  enableBasketball: process.env.NEXT_PUBLIC_ENABLE_BASKETBALL !== 'false',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const
