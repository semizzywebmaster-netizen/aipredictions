import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'

const router = Router()

const createSchema = z.object({
  leagueId: z.number().int().positive(),
  name: z.string().trim().min(2).max(150),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).max(150),
  shortName: z.string().trim().max(50).optional(),
  country: z.string().trim().max(100).optional(),
  logoUrl: z.string().url().max(500).optional(),
  externalId: z.string().trim().max(100).optional(),
})

const updateSchema = createSchema.omit({ leagueId: true }).partial().extend({
  leagueId: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
})

const parseId = (value: string) => {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

router.get('/', (async (req, res, next) => {
  try {
    const leagueId = req.query.leagueId ? Number(req.query.leagueId) : undefined
    const teams = await prisma.team.findMany({
      where: { isActive: true, ...(leagueId && Number.isInteger(leagueId) ? { leagueId } : {}) },
      include: { league: { include: { sport: true } } },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: { teams } })
  } catch (error) { next(error) }
}) as RequestHandler)

router.get('/:id', (async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    if (!id) { res.status(400).json({ success: false, error: { code: 'INVALID_TEAM_ID', message: 'Invalid team ID.' } }); return }
    const team = await prisma.team.findUnique({ where: { id }, include: { league: { include: { sport: true } } } })
    if (!team) { res.status(404).json({ success: false, error: { code: 'TEAM_NOT_FOUND', message: 'Team not found.' } }); return }
    res.json({ success: true, data: { team } })
  } catch (error) { next(error) }
}) as RequestHandler)

router.post('/', requireAuth, requireRole('ADMIN'), (async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid team details.', details: parsed.error.flatten().fieldErrors } }); return }
    const league = await prisma.league.findUnique({ where: { id: parsed.data.leagueId } })
    if (!league) { res.status(404).json({ success: false, error: { code: 'LEAGUE_NOT_FOUND', message: 'League not found.' } }); return }
    const team = await prisma.team.create({ data: parsed.data, include: { league: true } })
    res.status(201).json({ success: true, data: { team } })
  } catch (error) { next(error) }
}) as RequestHandler)

router.patch('/:id', requireAuth, requireRole('ADMIN'), (async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    if (!id) { res.status(400).json({ success: false, error: { code: 'INVALID_TEAM_ID', message: 'Invalid team ID.' } }); return }
    const parsed = updateSchema.safeParse(req.body)
    if (!parsed.success) { res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid team details.', details: parsed.error.flatten().fieldErrors } }); return }
    if (parsed.data.leagueId) {
      const league = await prisma.league.findUnique({ where: { id: parsed.data.leagueId } })
      if (!league) { res.status(404).json({ success: false, error: { code: 'LEAGUE_NOT_FOUND', message: 'League not found.' } }); return }
    }
    const team = await prisma.team.update({ where: { id }, data: parsed.data, include: { league: true } })
    res.json({ success: true, data: { team } })
  } catch (error) { next(error) }
}) as RequestHandler)

export default router
