import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export type PredictionsParams = PaginatedParams & { sport?: string; leagueId?: string; confidenceMin?: number; risk?: string; market?: string; status?: string; fixtureId?: string }

export const predictionsService = {
  list: (params?: PredictionsParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/predictions', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/predictions/${id}`),
  byFixture: (fixtureId: string) => api.get<ApiResponse<any[]>>(`/predictions/fixture/${fixtureId}`),
  recommended: (sport?: string) => api.get<ApiResponse<any[]>>('/predictions/recommended', { params: { sport } as any }),
  highConfidence: (sport?: string) => api.get<ApiResponse<any[]>>('/predictions/high-confidence', { params: { sport } as any }),
  history: (params?: PredictionsParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/predictions/history', { params: params as any }),
  accuracy: (params?: { sport?: string; days?: number }) => api.get<ApiResponse<any>>('/predictions/accuracy', { params: params as any }),
}
