import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const analystsService = {
  list: (params?: PaginatedParams & { sport?: string }) => api.get<ApiResponse<PaginatedResponse<any>>>('/analysts', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/analysts/${id}`),
  leaderboard: (params?: { sport?: string }) => api.get<ApiResponse<any[]>>('/analysts/leaderboard', { params: params as any }),
  follow: (id: string) => api.post<ApiResponse<void>>(`/analysts/${id}/follow`),
  unfollow: (id: string) => api.delete<ApiResponse<void>>(`/analysts/${id}/follow`),
  predictions: (id: string, params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>(`/analysts/${id}/predictions`, { params: params as any }),
}
