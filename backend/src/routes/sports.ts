import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'

const router = Router()
const createSportSchema = z.object({ name: z.string().trim().min(2).max(100), slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).max(100), iconUrl: z.string().url().max(500).optional() })
const updateSportSchema = createSportSchema.partial().extend({ status: z.enum(['ACTIVE', 'INACTIVE']).optional() })

const listHandler: RequestHandler = async (_req, res, next) => {
  try {
    const sports = await prisma.sport.findMany({ where: { status: 'ACTIVE' }, orderBy: { name: 'asc' } })
    res.json({ success: true, data: { sports } })
  } catch (error) { next(error) }
}

const getHandler: RequestHandler = async (req, res, next) => {
  try {
    const sport = await prisma.sport.findUnique({ where: { slug: req.params.slug } })
    if (!sport) { res.status(404).json({ success: false, error: { code: 'SPORT_NOT_FOUND', message: 'Sport not found.' } }); return }
    res.json({ success: true, data: { sport } })
  } catch (error) { next(error) }
}

const createHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = createSportSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid sport details.', details: parsed.error.flatten().fieldErrors } }); return }
    const sport = await prisma.sport.create({ data: parsed.data })
    res.status(201).json({ success: true, data: { sport } })
  } catch (error) { next(error) }
}

const updateHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = updateSportSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid sport details.', details: parsed.error.flatten().fieldErrors } }); return }
    const sport = await prisma.sport.update({ where: { id: Number(req.params.id) }, data: parsed.data })
    res.json({ success: true, data: { sport } })
  } catch (error) { next(error) }
}

router.get('/', listHandler)
router.get('/:slug', getHandler)
router.post('/', requireAuth, requireRole('ADMIN'), createHandler)
router.patch('/:id', requireAuth, requireRole('ADMIN'), updateHandler)
export default router
