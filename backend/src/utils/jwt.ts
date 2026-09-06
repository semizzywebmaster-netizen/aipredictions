import { createHmac, randomBytes } from 'node:crypto'
import { env } from '../config/env'

type AccessTokenPayload = {
  sub: string
  role: string
  iat: number
  exp: number
  jti: string
}

function base64Url(value: string): string {
  return Buffer.from(value).toString('base64url')
}

function sign(value: string): string {
  return createHmac('sha256', env.JWT_ACCESS_SECRET).update(value).digest('base64url')
}

export function createAccessToken(userId: number, role: string): string {
  const now = Math.floor(Date.now() / 1000)
  const payload: AccessTokenPayload = {
    sub: String(userId),
    role,
    iat: now,
    exp: now + 15 * 60,
    jti: randomBytes(16).toString('hex'),
  }
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64Url(JSON.stringify(payload))
  return `${header}.${body}.${sign(`${header}.${body}`)}`
}
