export const APP_NAME = 'PUNTER PREDICTION'
export const APP_TAGLINE = 'Professional Sports Prediction Intelligence'
export const APP_DESCRIPTION = 'AI-powered football and basketball prediction platform with equal depth for both sports.'

export const SPORTS = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
} as const

export const FOOTBALL_COLOR = '#059669'
export const BASKETBALL_COLOR = '#EA580C'

export const API_VERSION = 'v1'
export const API_BASE = '/api/v1'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  LIMITS: [10, 20, 50, 100],
}

export const STORAGE_KEYS = {
  THEME: 'punter-theme',
  SPORT_PREFERENCE: 'punter-sport',
  RECENT_SEARCHES: 'punter-recent-searches',
  BET_BUILDER: 'punter-bet-builder',
}

export const RESPONSIBLE_BETTING_MESSAGE = '18+ | Bet Responsibly | Predictions are analytical insights, not guarantees. Never bet more than you can afford to lose.'

export const CONFIDENCE_LEVELS = {
  LOW: { min: 0, max: 59, label: 'Low', color: 'bg-yellow-500' },
  MEDIUM: { min: 60, max: 79, label: 'Medium', color: 'bg-orange-500' },
  HIGH: { min: 80, max: 89, label: 'High', color: 'bg-emerald-500' },
  VERY_HIGH: { min: 90, max: 100, label: 'Very High', color: 'bg-emerald-700' },
} as const

export const RISK_LEVELS = {
  LOW: { label: 'Low Risk', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  MEDIUM: { label: 'Medium Risk', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  HIGH: { label: 'High Risk', color: 'text-red-600 bg-red-50 border-red-200' },
} as const
