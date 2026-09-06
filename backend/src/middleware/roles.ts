import type { RequestHandler } from 'express'
import type { UserRole } from '@prisma/client'

export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, res, next) => {
    const role = req.auth?.role as UserRole | undefined
    if (!role || !roles.includes(role)) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to access this resource.' } })
      return
    }
    next()
  }
}
