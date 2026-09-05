import { api } from '@/lib/api-client'
import type { ApiResponse, User, AuthTokens, LoginPayload, RegisterPayload } from '@/types/api'

export const authService = {
  login: (payload: LoginPayload) => api.post<ApiResponse<AuthTokens & { user: User }>>('/auth/login', payload),
  register: (payload: RegisterPayload) => api.post<ApiResponse<User>>('/auth/register', payload),
  logout: () => api.post<ApiResponse<void>>('/auth/logout'),
  me: () => api.get<ApiResponse<User>>('/auth/me'),
  refresh: (refreshToken: string) => api.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken }),
  verifyEmail: (code: string) => api.post<ApiResponse<void>>('/auth/verify-email', { code }),
  requestPasswordReset: (email: string) => api.post<ApiResponse<void>>('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => api.post<ApiResponse<void>>('/auth/reset-password', { token, password }),
  requestPhoneOtp: (phone: string) => api.post<ApiResponse<void>>('/auth/phone-otp', { phone }),
  verifyPhoneOtp: (phone: string, otp: string) => api.post<ApiResponse<void>>('/auth/verify-phone', { phone, otp }),
}
