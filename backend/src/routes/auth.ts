import { Router, type RequestHandler } from 'express'
import { createHash, randomBytes } from 'node:crypto'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword, verifyPassword } from '../utils/password'
import { createAccessToken } from '../utils/jwt'
import { requireAuth } from '../middleware/auth'
import { sendVerificationEmail } from '../services/email'

const router = Router()
const registerSchema = z.object({ email: z.string().trim().toLowerCase().email().max(191), password: z.string().min(8).max(128), firstName: z.string().trim().min(1).max(100).optional(), lastName: z.string().trim().min(1).max(100).optional(), phone: z.string().trim().min(7).max(32).optional() })
const loginSchema = z.object({ email: z.string().trim().toLowerCase().email().max(191), password: z.string().min(1).max(128) })
const refreshSchema = z.object({ refreshToken: z.string().min(32).max(512) })
const verifyEmailSchema = z.object({ code: z.string().trim().min(32).max(512) })
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid registration details.', details: parsed.error.flatten().fieldErrors } }); return }
    const { email, password, firstName, lastName, phone } = parsed.data
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] }, select: { id: true, email: true, phone: true } })
    if (existing) { const field = existing.email === email ? 'email' : 'phone'; res.status(409).json({ success: false, error: { code: 'ACCOUNT_EXISTS', message: `An account with this ${field} already exists.` } }); return }
    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, phone, passwordHash, firstName, lastName }, select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true, createdAt: true } })

    const verificationCode = randomBytes(32).toString('base64url')
    await prisma.authToken.create({ data: { userId: user.id, tokenHash: hashToken(verificationCode), type: 'EMAIL_VERIFICATION', expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) } })
    await prisma.auditLog.create({ data: { userId: user.id, action: 'AUTH_REGISTER', entity: 'User', entityId: String(user.id), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })

    let verificationSent = false
    try { verificationSent = await sendVerificationEmail(user.email, user.firstName, verificationCode) } catch { verificationSent = false }

    res.status(201).json({ success: true, data: { user, message: verificationSent ? 'Account created successfully. Please check your email to verify your account.' : 'Account created successfully. Email verification is pending configuration.' } })
  } catch (error) { next(error) }
}

const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid login details.', details: parsed.error.flatten().fieldErrors } }); return }
    const { email, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await verifyPassword(password, user.passwordHash))) { res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' } }); return }
    if (user.status !== 'ACTIVE') { res.status(403).json({ success: false, error: { code: 'ACCOUNT_UNAVAILABLE', message: 'This account is not currently active.' } }); return }
    const accessToken = createAccessToken(user.id, user.role)
    const refreshToken = randomBytes(48).toString('base64url')
    await prisma.session.create({ data: { userId: user.id, tokenHash: hashToken(refreshToken), userAgent: req.get('user-agent'), ipAddress: req.ip, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    await prisma.auditLog.create({ data: { userId: user.id, action: 'AUTH_LOGIN', entity: 'User', entityId: String(user.id), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })
    const safeUser = { id: user.id, email: user.email, phone: user.phone, firstName: user.firstName, lastName: user.lastName, role: user.role, status: user.status, emailVerifiedAt: user.emailVerifiedAt, phoneVerifiedAt: user.phoneVerifiedAt }
    res.status(200).json({ success: true, data: { user: safeUser, accessToken, refreshToken, tokenType: 'Bearer', expiresIn: 900, refreshExpiresIn: 2592000 } })
  } catch (error) { next(error) }
}

const refreshHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = refreshSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'A valid refresh token is required.' } }); return }
    const tokenHash = hashToken(parsed.data.refreshToken)
    const session = await prisma.session.findUnique({ where: { tokenHash }, include: { user: true } })
    if (!session || session.revokedAt || session.expiresAt <= new Date() || session.user.status !== 'ACTIVE') { res.status(401).json({ success: false, error: { code: 'INVALID_REFRESH_TOKEN', message: 'The refresh token is invalid or expired.' } }); return }
    const newRefreshToken = randomBytes(48).toString('base64url')
    await prisma.session.update({ where: { id: session.id }, data: { tokenHash: hashToken(newRefreshToken), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    const accessToken = createAccessToken(session.user.id, session.user.role)
    res.status(200).json({ success: true, data: { accessToken, refreshToken: newRefreshToken, tokenType: 'Bearer', expiresIn: 900, refreshExpiresIn: 2592000 } })
  } catch (error) { next(error) }
}

const verifyEmailHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = verifyEmailSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'A valid verification code is required.' } }); return }
    const tokenHash = hashToken(parsed.data.code)
    const token = await prisma.authToken.findUnique({ where: { tokenHash }, include: { user: true } })
    if (!token || token.type !== 'EMAIL_VERIFICATION' || token.consumedAt || token.expiresAt <= new Date()) { res.status(400).json({ success: false, error: { code: 'INVALID_VERIFICATION_CODE', message: 'The verification code is invalid or expired.' } }); return }
    await prisma.$transaction([
      prisma.authToken.update({ where: { id: token.id }, data: { consumedAt: new Date() } }),
      prisma.user.update({ where: { id: token.userId }, data: { emailVerifiedAt: new Date() } }),
      prisma.auditLog.create({ data: { userId: token.userId, action: 'AUTH_EMAIL_VERIFIED', entity: 'User', entityId: String(token.userId), ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } }),
    ])
    res.json({ success: true, data: { message: 'Email verified successfully.' } })
  } catch (error) { next(error) }
}

const meHandler: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.auth?.sub) }, select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true, lastLoginAt: true, createdAt: true } })
    if (!user) { res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found.' } }); return }
    res.json({ success: true, data: { user } })
  } catch (error) { next(error) }
}

const logoutHandler: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken : ''
    if (refreshToken) await prisma.session.updateMany({ where: { tokenHash: hashToken(refreshToken), userId: Number(req.auth?.sub), revokedAt: null }, data: { revokedAt: new Date() } })
    else await prisma.session.updateMany({ where: { userId: Number(req.auth?.sub), revokedAt: null }, data: { revokedAt: new Date() } })
    await prisma.auditLog.create({ data: { userId: Number(req.auth?.sub), action: 'AUTH_LOGOUT', entity: 'User', entityId: req.auth?.sub, ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined } })
    res.json({ success: true, data: { message: 'Logged out successfully.' } })
  } catch (error) { next(error) }
}

router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.post('/refresh', refreshHandler)
router.post('/verify-email', verifyEmailHandler)
router.get('/me', requireAuth, meHandler)
router.post('/logout', requireAuth, logoutHandler)

export default router
