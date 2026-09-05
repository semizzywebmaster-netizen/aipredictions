import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const communityService = {
  feed: (params?: PaginatedParams & { sport?: string; trending?: boolean }) => api.get<ApiResponse<PaginatedResponse<any>>>('/community/feed', { params: params as any }),
  post: (id: string) => api.get<ApiResponse<any>>(`/community/posts/${id}`),
  createPost: (payload: any) => api.post<ApiResponse<any>>('/community/posts', payload),
  like: (id: string) => api.post<ApiResponse<void>>(`/community/posts/${id}/like`),
  save: (id: string) => api.post<ApiResponse<void>>(`/community/posts/${id}/save`),
  comment: (id: string, content: string) => api.post<ApiResponse<any>>(`/community/posts/${id}/comments`, { content }),
  report: (id: string, reason: string) => api.post<ApiResponse<void>>(`/community/posts/${id}/report`, { reason }),
}
