import { Router, type RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'
const router=Router()
const filters=z.object({leagueId:z.coerce.number().int().positive().optional(),confidenceMin:z.coerce.number().min(0).max(1).optional(),risk:z.string().optional(),market:z.string().optional(),status:z.string().optional(),fixtureId:z.coerce.number().int().positive().optional()})
const createSchema=z.object({fixtureId:z.number().int().positive(),market:z.string().trim().min(1).max(100),selection:z.string().trim().min(1).max(150),confidence:z.number().min(0).max(1),risk:z.string().trim().max(30),odds:z.number().positive().optional(),reasoning:z.record(z.string(),z.any()).optional()})
const listHandler:RequestHandler=async(req,res,next)=>{try{const q=filters.safeParse(req.query);if(!q.success){res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'Invalid prediction filters.'}});return}const p=q.data;const predictions=await prisma.prediction.findMany({where:{...(p.fixtureId?{fixtureId:p.fixtureId}:{}),...(p.confidenceMin!==undefined?{confidence:{gte:p.confidenceMin}}:{}),...(p.risk?{risk:p.risk}:{}),...(p.market?{market:p.market}:{}),...(p.status?{status:p.status}:{})},orderBy:[{confidence:'desc'},{createdAt:'desc'}]});res.json({success:true,data:{predictions}})}catch(e){next(e)}}
router.get('/',listHandler)
router.get('/recommended',async(_req,res,next)=>{try{const predictions=await prisma.prediction.findMany({where:{status:'PENDING'},orderBy:{confidence:'desc'},take:20});res.json({success:true,data:{predictions}})}catch(e){next(e)}})
router.get('/high-confidence',async(_req,res,next)=>{try{const predictions=await prisma.prediction.findMany({where:{confidence:{gte:.75},status:'PENDING'},orderBy:{confidence:'desc'},take:50});res.json({success:true,data:{predictions}})}catch(e){next(e)}})
router.get('/history',listHandler)
router.get('/accuracy',async(_req,res,next)=>{try{const [total,settled,wins]=await Promise.all([prisma.prediction.count(),prisma.prediction.count({where:{status:{in:['WON','LOST']}}}),prisma.prediction.count({where:{status:'WON'}})]);res.json({success:true,data:{total,settled,wins,accuracy:settled?wins/settled:0}})}catch(e){next(e)}})
router.get('/fixture/:fixtureId',async(req,res,next)=>{try{const predictions=await prisma.prediction.findMany({where:{fixtureId:Number(req.params.fixtureId)},orderBy:{confidence:'desc'}});res.json({success:true,data:{predictions}})}catch(e){next(e)}})
router.get('/:id',async(req,res,next)=>{try{const prediction=await prisma.prediction.findUnique({where:{id:Number(req.params.id)}});if(!prediction){res.status(404).json({success:false,error:{code:'PREDICTION_NOT_FOUND',message:'Prediction not found.'}});return}res.json({success:true,data:{prediction}})}catch(e){next(e)}})
router.post('/',requireAuth,requireRole('ADMIN','ANALYST'),async(req,res,next)=>{try{const p=createSchema.safeParse(req.body);if(!p.success){res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'Invalid prediction details.',details:p.error.flatten().fieldErrors}});return}const prediction=await prisma.prediction.create({data:p.data});res.status(201).json({success:true,data:{prediction}})}catch(e){next(e)}})
export default router
