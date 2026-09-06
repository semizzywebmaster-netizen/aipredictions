import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword } from '../utils/password'

const router = Router()

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  password: z.string().min(8).max(128),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(7).max(32).optional(),
})

const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid registration details.',
          details: parsed.error.flatten().fieldErrors,
        },
      })
      return
    }

    const { email, password, firstName, lastName, phone } = parsed.data
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : []),
        ],
      },
      select: { id: true, email: true, phone: true },
    })

    if (existing) {
      const field = existing.email === email ? 'email' : 'phone'
      res.status(409).json({
        success: false,
        error: {
          code: 'ACCOUNT_EXISTS',
          message: `An account with this ${field} already exists.`,
        },
      })
      return
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        passwordHash,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        phoneVerifiedAt: true,
        createdAt: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'AUTH_REGISTER',
        entity: 'User',
        entityId: String(user.id),
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
      },
    })

    res.status(201).json({
      success: true,
      data: {
        user,
        message: 'Account created successfully. Please verify your account when verification is enabled.',
      },
    })
  } catch (error) {
    next(error)
  }
}

router.post('/register', registerHandler)

export default router
