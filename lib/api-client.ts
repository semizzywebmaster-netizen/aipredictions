import { env } from '@/config/env'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiClientOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export class ApiError extends Error {
  status: number
  code?: string
  details?: unknown
  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

function buildUrl(endpoint: string, params?: ApiClientOptions['params']): string {
  const url = endpoint.startsWith('http') ? endpoint : `${env.apiUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  if (!params) return url
  const search = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') search.set(k, String(v))
  })
  const qs = search.toString()
  return qs ? `${url}?${qs}` : url
}

export async function apiClient<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, params, signal, cache, next } = options

  const url = buildUrl(endpoint, params)

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  }
  if (token) reqHeaders.Authorization = `Bearer ${token}`

  const config: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: reqHeaders,
    signal,
    cache,
    next,
  }

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(url, {
      ...config,
      signal: signal || controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new ApiError(
        errorBody.message || `Request failed with ${response.status}`,
        response.status,
        errorBody.code,
        errorBody
      )
    }

    const data = await response.json().catch(() => null)
    return data as T
  } catch (err) {
    clearTimeout(timeout)
    if (err instanceof ApiError) throw err
    if ((err as Error).name === 'AbortError') throw new ApiError('Request timeout', 408, 'TIMEOUT')
    throw new ApiError((err as Error).message || 'Network error', 0, 'NETWORK_ERROR')
  }
}

// Typed helpers
export const api = {
  get: <T>(endpoint: string, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'POST', body }),
  put: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'PUT', body }),
  patch: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'PATCH', body }),
  delete: <T>(endpoint: string, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'DELETE' }),
}
