import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'
import type { BetSelection } from '@/types/domain'

export interface BuildBetPayload { selections: BetSelection[]; strategy?: 'conservative' | 'balanced' | 'aggressive'; targetOdds?: number; stake?: number }

export const betBuilderService = {
  build: (payload: BuildBetPayload) => api.post<ApiResponse<any>>('/bet-builder/build', payload),
  validate: (selections: BetSelection[]) => api.post<ApiResponse<any>>('/bet-builder/validate', { selections }),
  optimize: (payload: BuildBetPayload) => api.post<ApiResponse<any>>('/bet-builder/optimize', payload),
  strategies: () => api.get<ApiResponse<any[]>>('/bet-builder/strategies'),
}
