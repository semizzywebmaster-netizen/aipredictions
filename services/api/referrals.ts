import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const referralsService = {
  dashboard: () => api.get<ApiResponse<any>>('/referrals/dashboard'),
  code: () => api.get<ApiResponse<{ code: string; link: string }>>('/referrals/code'),
  invited: () => api.get<ApiResponse<any[]>>('/referrals/invited'),
  rewards: () => api.get<ApiResponse<any[]>>('/referrals/rewards'),
}
