import { env } from '../config/env'

export async function sendPhoneOtp(phone: string, code: string): Promise<boolean> {
  if (!env.SMS_PROVIDER || env.SMS_PROVIDER === 'disabled') return false

  if (env.SMS_PROVIDER === 'log') {
    if (env.NODE_ENV !== 'production') console.info(`[SMS OTP] ${phone}: ${code}`)
    return true
  }

  // Provider integrations are intentionally isolated here so credentials can be
  // added later without changing the authentication contract.
  return false
}
