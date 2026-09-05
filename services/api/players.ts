import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const playersService = {
  list: (params?: PaginatedParams & { teamId?: string; sport?: string; search?: string }) => api.get<ApiResponse<PaginatedResponse<any>>>('/players', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/players/${id}`),
  stats: (id: string) => api.get<ApiResponse<any>>(`/players/${id}/stats`),
}
