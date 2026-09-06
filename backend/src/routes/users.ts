import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()
const profileSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
})

const profileHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub)
    const parsed = profileSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid profile details.', details: parsed.error.flatten().fieldErrors } })
      return
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: parsed.data,
      select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true, lastLoginAt: true, createdAt: true, updatedAt: true },
    })
    await prisma.auditLog.create({ data: { userId, action: 'USER_PROFILE_UPDATED', entity: 'User', entityId: String(userId), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })
    res.json({ success: true, data: { user } })
  } catch (error) { next(error) }
}

router.get('/profile', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.auth?.sub) }, select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true, lastLoginAt: true, createdAt: true, updatedAt: true } })
    if (!user) { res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found.' } }); return }
    res.json({ success: true, data: { user } })
  } catch (error) { next(error) }
})

router.patch('/profile', requireAuth, profileHandler)
export default router
