import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

export const aiService = {
  chat: (message: string, conversationId?: string, context?: { sport?: string; fixtureId?: string; teamId?: string }) => api.post<ApiResponse<any>>('/ai/chat', { message, conversationId, context }),
  conversations: () => api.get<ApiResponse<any[]>>('/ai/conversations'),
  conversation: (id: string) => api.get<ApiResponse<any>>(`/ai/conversations/${id}`),
  deleteConversation: (id: string) => api.delete<ApiResponse<void>>(`/ai/conversations/${id}`),
  analyzeMatch: (fixtureId: string) => api.post<ApiResponse<any>>('/ai/analyze/match', { fixtureId }),
  analyzeTeam: (teamId: string) => api.post<ApiResponse<any>>('/ai/analyze/team', { teamId }),
  explainPrediction: (predictionId: string) => api.post<ApiResponse<any>>('/ai/explain/prediction', { predictionId }),
  buildBet: (prompt: string) => api.post<ApiResponse<any>>('/ai/bet-builder', { prompt }),
}
