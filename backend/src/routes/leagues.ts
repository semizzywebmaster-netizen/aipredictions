import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'

const router = Router()
const createSchema = z.object({ sportId: z.number().int().positive(), name: z.string().trim().min(2).max(150), slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).max(150), country: z.string().trim().max(100).optional(), logoUrl: z.string().url().max(500).optional(), externalId: z.string().trim().max(100).optional() })

router.get('/', (async (req, res, next) => {
  try {
    const sportId = req.query.sportId ? Number(req.query.sportId) : undefined
    const leagues = await prisma.league.findMany({ where: { isActive: true, ...(sportId ? { sportId } : {}) }, include: { sport: true }, orderBy: { name: 'asc' } })
    res.json({ success: true, data: { leagues } })
  } catch (error) { next(error) }
}) as RequestHandler)

router.get('/:id', (async (req, res, next) => {
  try {
    const league = await prisma.league.findUnique({ where: { id: Number(req.params.id) }, include: { sport: true } })
    if (!league) { res.status(404).json({ success: false, error: { code: 'LEAGUE_NOT_FOUND', message: 'League not found.' } }); return }
    res.json({ success: true, data: { league } })
  } catch (error) { next(error) }
}) as RequestHandler)

router.post('/', requireAuth, requireRole('ADMIN'), (async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid league details.', details: parsed.error.flatten().fieldErrors } }); return }
    const league = await prisma.league.create({ data: parsed.data })
    res.status(201).json({ success: true, data: { league } })
  } catch (error) { next(error) }
}) as RequestHandler)

export default router
