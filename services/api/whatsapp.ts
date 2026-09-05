import { api } from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

export const whatsappService = {
  status: () => api.get<ApiResponse<any>>('/whatsapp/status'),
  link: (phone: string) => api.post<ApiResponse<{ otpRequired: boolean }>>('/whatsapp/link', { phone }),
  verifyOtp: (otp: string) => api.post<ApiResponse<any>>('/whatsapp/verify', { otp }),
  unlink: () => api.delete<ApiResponse<void>>('/whatsapp/link'),
  preferences: () => api.get<ApiResponse<any>>('/whatsapp/preferences'),
  updatePreferences: (prefs: any) => api.put<ApiResponse<any>>('/whatsapp/preferences', prefs),
}
