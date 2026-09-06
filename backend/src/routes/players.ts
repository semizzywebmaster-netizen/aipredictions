import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'

const router = Router()
const createSchema = z.object({ teamId: z.number().int().positive(), name: z.string().trim().min(2).max(150), slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).max(150), position: z.string().trim().max(50).optional(), nationality: z.string().trim().max(100).optional(), dateOfBirth: z.coerce.date().optional(), jerseyNumber: z.number().int().min(0).max(999).optional(), photoUrl: z.string().url().max(500).optional(), externalId: z.string().trim().max(100).optional() })
const updateSchema = createSchema.omit({ teamId: true }).partial().extend({ isActive: z.boolean().optional() })

router.get('/', (async (req, res, next) => {
  try {
    const teamId = req.query.teamId ? Number(req.query.teamId) : undefined
    const players = await prisma.player.findMany({ where: { isActive: true, ...(teamId ? { teamId } : {}) }, include: { team: true }, orderBy: { name: 'asc' } })
    res.json({ success: true, data: { players } })
  } catch (error) { next(error) }
}) as RequestHandler)
router.get('/:id', (async (req, res, next) => {
  try {
    const player = await prisma.player.findUnique({ where: { id: Number(req.params.id) }, include: { team: true } })
    if (!player) { res.status(404).json({ success: false, error: { code: 'PLAYER_NOT_FOUND', message: 'Player not found.' } }); return }
    res.json({ success: true, data: { player } })
  } catch (error) { next(error) }
}) as RequestHandler)
router.post('/', requireAuth, requireRole('ADMIN'), (async (req, res, next) => {
  try { const parsed = createSchema.safeParse(req.body); if (!parsed.success) { res.status(400).json({ success:false,error:{code:'VALIDATION_ERROR',message:'Invalid player details.',details:parsed.error.flatten().fieldErrors}}); return }; const player = await prisma.player.create({ data: parsed.data }); res.status(201).json({success:true,data:{player}}) } catch(error){next(error)}
}) as RequestHandler)
router.patch('/:id', requireAuth, requireRole('ADMIN'), (async (req, res, next) => {
  try { const parsed = updateSchema.safeParse(req.body); if (!parsed.success) { res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'Invalid player details.',details:parsed.error.flatten().fieldErrors}}); return }; const player = await prisma.player.update({where:{id:Number(req.params.id)},data:parsed.data}); res.json({success:true,data:{player}}) } catch(error){next(error)}
}) as RequestHandler)
export default router
