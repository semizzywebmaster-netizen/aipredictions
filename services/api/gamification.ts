import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const gamificationService = {
  profile: () => api.get<ApiResponse<any>>('/gamification/profile'),
  leaderboard: (params?: { sport?: string; period?: string }) => api.get<ApiResponse<any[]>>('/gamification/leaderboard', { params: params as any }),
  badges: () => api.get<ApiResponse<any[]>>('/gamification/badges'),
  challenges: () => api.get<ApiResponse<any[]>>('/gamification/challenges'),
  streak: () => api.get<ApiResponse<any>>('/gamification/streak'),
}
