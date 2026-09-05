import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const searchService = {
  global: (q: string, params?: { sport?: string; type?: string }) => api.get<ApiResponse<any>>('/search', { params: { q, ...params } as any }),
  teams: (q: string) => api.get<ApiResponse<any[]>>('/search/teams', { params: { q } }),
  players: (q: string) => api.get<ApiResponse<any[]>>('/search/players', { params: { q } }),
  leagues: (q: string) => api.get<ApiResponse<any[]>>('/search/leagues', { params: { q } }),
  fixtures: (q: string) => api.get<ApiResponse<any[]>>('/search/fixtures', { params: { q } }),
}
