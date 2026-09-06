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
  timeoutMs?: number
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
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${env.apiUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  if (!params) return url

  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value))
  })

  const query = search.toString()
  return query ? `${url}?${query}` : url
}

function mergeAbortSignals(signal: AbortSignal | undefined, timeoutMs: number): {
  signal: AbortSignal
  cleanup: () => void
  timedOut: () => boolean
} {
  const controller = new AbortController()
  let didTimeout = false
  const timeout = setTimeout(() => {
    didTimeout = true
    controller.abort()
  }, timeoutMs)

  const abortFromCaller = () => controller.abort()
  signal?.addEventListener('abort', abortFromCaller, { once: true })

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout)
      signal?.removeEventListener('abort', abortFromCaller)
    },
    timedOut: () => didTimeout,
  }
}

export async function apiClient<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    signal,
    cache,
    next,
    timeoutMs = 15000,
  } = options

  const url = buildUrl(endpoint, params)
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const reqHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }

  if (body !== undefined && method !== 'GET') {
    reqHeaders['Content-Type'] = 'application/json'
  }

  if (token) reqHeaders.Authorization = `Bearer ${token}`

  const abort = mergeAbortSignals(signal, timeoutMs)

  try {
    const response = await fetch(url, {
      method,
      headers: reqHeaders,
      signal: abort.signal,
      cache,
      next,
      ...(body !== undefined && method !== 'GET' ? { body: JSON.stringify(body) } : {}),
    })

    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text().catch(() => '')

    if (!response.ok) {
      const errorBody = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}
      const message = typeof errorBody.message === 'string'
        ? errorBody.message
        : `Request failed with ${response.status}`
      const code = typeof errorBody.code === 'string' ? errorBody.code : undefined
      throw new ApiError(message, response.status, code, payload)
    }

    // 204 No Content and empty successful responses are valid.
    return (payload === '' || payload === null ? undefined : payload) as T
  } catch (err) {
    if (err instanceof ApiError) throw err

    if ((err as Error).name === 'AbortError') {
      if (abort.timedOut()) throw new ApiError('Request timeout', 408, 'TIMEOUT')
      throw new ApiError('Request cancelled', 499, 'REQUEST_CANCELLED')
    }

    throw new ApiError((err as Error).message || 'Network error', 0, 'NETWORK_ERROR')
  } finally {
    abort.cleanup()
  }
}

export const api = {
  get: <T>(endpoint: string, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'POST', body }),
  put: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'PUT', body }),
  patch: <T>(endpoint: string, body?: unknown, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'PATCH', body }),
  delete: <T>(endpoint: string, opts?: ApiClientOptions) => apiClient<T>(endpoint, { ...opts, method: 'DELETE' }),
}
