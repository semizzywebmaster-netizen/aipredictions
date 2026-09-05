import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const notificationsService = {
  list: (params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/notifications', { params: params as any }),
  unreadCount: () => api.get<ApiResponse<{ count: number }>>('/notifications/unread-count'),
  markRead: (id: string) => api.post<ApiResponse<void>>(`/notifications/${id}/read`),
  markAllRead: () => api.post<ApiResponse<void>>('/notifications/read-all'),
  preferences: () => api.get<ApiResponse<any>>('/notifications/preferences'),
  updatePreferences: (prefs: any) => api.put<ApiResponse<any>>('/notifications/preferences', prefs),
}
