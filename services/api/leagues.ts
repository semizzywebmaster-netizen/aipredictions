import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const leaguesService = {
  list: (params?: PaginatedParams & { sport?: string; featured?: boolean }) => api.get<ApiResponse<PaginatedResponse<any>>>('/leagues', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/leagues/${id}`),
  standings: (id: string) => api.get<ApiResponse<any>>(`/leagues/${id}/standings`),
  fixtures: (id: string, params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>(`/leagues/${id}/fixtures`, { params: params as any }),
}
