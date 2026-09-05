import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const betCodesService = {
  generate: (payload: any) => api.post<ApiResponse<{ code: string; selections: any[] }>>('/bet-codes/generate', payload),
  import: (code: string, provider?: string) => api.post<ApiResponse<any>>('/bet-codes/import', { code, provider }),
  merge: (codes: string[]) => api.post<ApiResponse<any>>('/bet-codes/merge', { codes }),
  lookup: (code: string) => api.get<ApiResponse<any>>(`/bet-codes/${code}`),
  convert: (code: string, toProvider: string) => api.post<ApiResponse<any>>('/bet-codes/convert', { code, toProvider }),
  history: () => api.get<ApiResponse<any[]>>('/bet-codes/history'),
}
