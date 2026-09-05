import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export type FixturesParams = PaginatedParams & { sport?: string; leagueId?: string; teamId?: string; date?: string; status?: string; from?: string; to?: string }

export const fixturesService = {
  list: (params?: FixturesParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/fixtures', { params: params as any }),
  get: (id: string) => api.get<ApiResponse<any>>(`/fixtures/${id}`),
  live: () => api.get<ApiResponse<any[]>>('/fixtures/live'),
  today: (sport?: string) => api.get<ApiResponse<any[]>>('/fixtures/today', { params: { sport } as any }),
  upcoming: (params?: FixturesParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/fixtures/upcoming', { params: params as any }),
  search: (q: string) => api.get<ApiResponse<any[]>>('/fixtures/search', { params: { q } }),
}
