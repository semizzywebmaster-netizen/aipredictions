import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword, verifyPassword } from '../utils/password'
import { createAccessToken } from '../utils/jwt'

const router = Router()

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  password: z.string().min(8).max(128),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(7).max(32).optional(),
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  password: z.string().min(1).max(128),
})

const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid registration details.', details: parsed.error.flatten().fieldErrors } })
      return
    }

    const { email, password, firstName, lastName, phone } = parsed.data
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
      select: { id: true, email: true, phone: true },
    })

    if (existing) {
      const field = existing.email === email ? 'email' : 'phone'
      res.status(409).json({ success: false, error: { code: 'ACCOUNT_EXISTS', message: `An account with this ${field} already exists.` } })
      return
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, phone, passwordHash, firstName, lastName },
      select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true, createdAt: true },
    })

    await prisma.auditLog.create({ data: { userId: user.id, action: 'AUTH_REGISTER', entity: 'User', entityId: String(user.id), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })
    res.status(201).json({ success: true, data: { user, message: 'Account created successfully. Please verify your account when verification is enabled.' } })
  } catch (error) { next(error) }
}

const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid login details.', details: parsed.error.flatten().fieldErrors } })
      return
    }

    const { email, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' } })
      return
    }

    if (user.status !== 'ACTIVE') {
      res.status(403).json({ success: false, error: { code: 'ACCOUNT_UNAVAILABLE', message: 'This account is not currently active.' } })
      return
    }

    const accessToken = createAccessToken(user.id, user.role)
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    await prisma.auditLog.create({ data: { userId: user.id, action: 'AUTH_LOGIN', entity: 'User', entityId: String(user.id), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })

    const safeUser = {
      id: user.id, email: user.email, phone: user.phone, firstName: user.firstName, lastName: user.lastName,
      role: user.role, status: user.status, emailVerifiedAt: user.emailVerifiedAt, phoneVerifiedAt: user.phoneVerifiedAt,
    }

    res.status(200).json({ success: true, data: { user: safeUser, accessToken, tokenType: 'Bearer', expiresIn: 900 } })
  } catch (error) { next(error) }
}

router.post('/register', registerHandler)
router.post('/login', loginHandler)

export default router
