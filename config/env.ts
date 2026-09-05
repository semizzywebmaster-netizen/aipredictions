// Public env only - never secrets
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'PUNTER PREDICTION',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  enablePwa: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  enableFootball: process.env.NEXT_PUBLIC_ENABLE_FOOTBALL !== 'false',
  enableBasketball: process.env.NEXT_PUBLIC_ENABLE_BASKETBALL !== 'false',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const
