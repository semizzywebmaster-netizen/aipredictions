import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import type { Sport } from '@/types/domain'

export interface SportDto { id: string; name: string; slug: Sport; isActive: boolean; icon?: string }

export const sportsService = {
  list: () => api.get<ApiResponse<SportDto[]>>('/sports'),
  get: (slug: string) => api.get<ApiResponse<SportDto>>(`/sports/${slug}`),
  competitions: (sport: string, params?: { page?: number; limit?: number; search?: string }) => api.get<ApiResponse<PaginatedResponse<any>>>('/sports/' + sport + '/competitions', { params: params as any }),
}
