import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const adminService = {
  dashboard: () => api.get<ApiResponse<any>>('/admin/dashboard'),
  users: (params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/admin/users', { params: params as any }),
  analytics: (params?: { from?: string; to?: string }) => api.get<ApiResponse<any>>('/admin/analytics', { params: params as any }),
  featureFlags: () => api.get<ApiResponse<any[]>>('/admin/feature-flags'),
  updateFeatureFlag: (key: string, enabled: boolean) => api.put<ApiResponse<any>>(`/admin/feature-flags/${key}`, { enabled }),
  auditLogs: (params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/admin/audit-logs', { params: params as any }),
}
