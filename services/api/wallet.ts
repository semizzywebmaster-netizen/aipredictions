import { api } from '@/lib/api-client'
import type { ApiResponse, PaginatedResponse, PaginatedParams } from '@/types/api'

export const walletService = {
  balance: () => api.get<ApiResponse<any>>('/wallet/balance'),
  transactions: (params?: PaginatedParams) => api.get<ApiResponse<PaginatedResponse<any>>>('/wallet/transactions', { params: params as any }),
  deposit: (amount: number, provider: 'paystack' | 'flutterwave') => api.post<ApiResponse<{ checkoutUrl: string; reference: string }>>('/wallet/deposit', { amount, provider }),
  verifyDeposit: (reference: string) => api.post<ApiResponse<any>>('/wallet/verify-deposit', { reference }),
  withdraw: (amount: number) => api.post<ApiResponse<any>>('/wallet/withdraw', { amount }),
  credits: () => api.get<ApiResponse<any>>('/wallet/credits'),
  purchaseCredits: (packageId: string) => api.post<ApiResponse<any>>('/wallet/credits/purchase', { packageId }),
}
