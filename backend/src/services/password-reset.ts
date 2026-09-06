import { createHash, randomBytes } from 'node:crypto'
import { prisma } from '../lib/prisma'

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export async function createPasswordResetToken(userId: number) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

  await prisma.authToken.updateMany({
    where: { userId, type: 'PASSWORD_RESET', consumedAt: null },
    data: { consumedAt: new Date() },
  })

  await prisma.authToken.create({
    data: { userId, tokenHash: hashToken(token), type: 'PASSWORD_RESET', expiresAt },
  })

  return { token, expiresAt }
}

export async function consumePasswordResetToken(token: string) {
  const record = await prisma.authToken.findUnique({
    where: { tokenHash: hashToken(token) },
  })

  if (!record || record.type !== 'PASSWORD_RESET' || record.consumedAt || record.expiresAt <= new Date()) return null

  return record
}
