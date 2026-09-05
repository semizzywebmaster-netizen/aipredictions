import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const adsService = {
  placements: (page: string) => api.get<ApiResponse<any[]>>(`/ads/placements`, { params: { page } as any }),
  rewarded: () => api.get<ApiResponse<any>>('/ads/rewarded'),
  claimReward: (adId: string) => api.post<ApiResponse<any>>('/ads/rewarded/claim', { adId }),
  trackImpression: (adId: string) => api.post<ApiResponse<void>>('/ads/impression', { adId }),
  trackClick: (adId: string) => api.post<ApiResponse<void>>('/ads/click', { adId }),
}
