// API Contract Types - API v1
export type ApiStatus = 'success' | 'error' | 'pending'

export interface ApiResponse<T> {
  status: ApiStatus
  data: T
  message?: string
  meta?: ApiMeta
  errors?: ApiError[]
}

export interface ApiMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
  hasNext?: boolean
  hasPrev?: boolean
}

export interface ApiError {
  field?: string
  message: string
  code?: string
}

export interface PaginatedParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: ApiMeta
}

// Domain API payloads
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  username: string
  phone?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  phone?: string
  isVerified: boolean
  role: 'user' | 'analyst' | 'admin'
  createdAt: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  favoriteSports: string[]
  favoriteLeagues: string[]
  favoriteTeams: string[]
  notificationPrefs: NotificationPrefs
  theme: 'light' | 'dark' | 'system'
}

export interface NotificationPrefs {
  predictionAlerts: boolean
  matchAlerts: boolean
  paymentAlerts: boolean
  communityAlerts: boolean
  email: boolean
  push: boolean
  whatsapp: boolean
}
