import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const teamsService = {
  list: (params?: PaginatedParams & { sport?: string; leagueId?: string; search?: string }) => api.get<ApiResponse<PaginatedResponse<any>>>('/teams', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/teams/${id}`),
  roster: (id: string) => api.get<ApiResponse<any>>(`/teams/${id}/roster`),
  fixtures: (id: string, params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>(`/teams/${id}/fixtures`, { params: params as any }),
  stats: (id: string) => api.get<ApiResponse<any>>(`/teams/${id}/stats`),
}
