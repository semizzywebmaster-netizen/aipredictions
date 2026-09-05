import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const subscriptionsService = {
  plans: () => api.get<ApiResponse<any[]>>('/subscriptions/plans'),
  current: () => api.get<ApiResponse<any>>('/subscriptions/current'),
  subscribe: (planId: string, billing: 'monthly' | 'yearly') => api.post<ApiResponse<any>>('/subscriptions/subscribe', { planId, billing }),
  cancel: () => api.post<ApiResponse<any>>('/subscriptions/cancel'),
  changePlan: (planId: string) => api.post<ApiResponse<any>>('/subscriptions/change-plan', { planId }),
}
