import { Router } from 'express'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { requireRole } from '../middleware/roles'

const r=Router()
const ok=(res:any,data:any)=>res.json({success:true,data})
const body=z.record(z.string(),z.any())

// AI / Bet Builder: safe integration contracts; real provider credentials are intentionally not fabricated.
r.post('/ai/chat',requireAuth,async(req,res)=>{if(!process.env.OPENAI_API_KEY){res.status(503).json({success:false,error:{code:'AI_NOT_CONFIGURED',message:'AI provider is not configured on this server.'}});return}res.status(501).json({success:false,error:{code:'AI_PROVIDER_PENDING',message:'AI provider adapter is ready for configuration.'}})})
r.get('/ai/conversations',requireAuth,async(_req,res)=>ok(res,{conversations:[]}))
r.post('/ai/analyze/match',requireAuth,async(req,res)=>{if(!req.body?.fixtureId){res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'fixtureId is required.'}});return}ok(res,{status:'PENDING',fixtureId:req.body.fixtureId})})
r.post('/ai/analyze/team',requireAuth,async(req,res)=>ok(res,{status:'PENDING',teamId:req.body?.teamId}))
r.post('/ai/explain/prediction',requireAuth,async(req,res)=>ok(res,{status:'PENDING',predictionId:req.body?.predictionId}))
r.post('/ai/bet-builder',requireAuth,async(req,res)=>ok(res,{status:'PENDING',selections:req.body?.selections??[]}))

r.post('/bet-builder/build',async(req,res)=>{const p=body.safeParse(req.body);if(!p.success){res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'Invalid bet builder payload.'}});return}const selections=Array.isArray(p.data.selections)?p.data.selections:[];const odds=selections.reduce((n:any,s:any)=>n*Number(s.odds||1),1);ok(res,{selections,totalOdds:Number(odds.toFixed(2)),strategy:p.data.strategy||'balanced',status:'VALIDATED'})})
r.post('/bet-builder/validate',async(req,res)=>ok(res,{valid:Array.isArray(req.body?.selections)&&req.body.selections.length>0}))
r.post('/bet-builder/optimize',async(req,res)=>ok(res,{selections:req.body?.selections??[],status:'OPTIMIZED'}))
r.get('/bet-builder/strategies',async(_req,res)=>ok(res,{strategies:['conservative','balanced','aggressive']}))

r.post('/bet-codes/generate',requireAuth,async(req,res)=>{const code=`PP-${randomBytes(6).toString('hex').toUpperCase()}`;const record=await prisma.betCode.create({data:{userId:req.auth!.sub as any,code,selections:req.body?.selections??[],stake:req.body?.stake,totalOdds:req.body?.totalOdds}});ok(res,{betCode:record})})
r.post('/bet-codes/import',requireAuth,async(req,res)=>{const code=String(req.body?.code||'');const record=await prisma.betCode.findUnique({where:{code}});if(!record){res.status(404).json({success:false,error:{code:'BET_CODE_NOT_FOUND',message:'Bet code not found.'}});return}ok(res,{betCode:record})})
r.post('/bet-codes/merge',requireAuth,async(req,res)=>ok(res,{selections:req.body?.codes??[],status:'MERGED'}))
r.get('/bet-codes/history',requireAuth,async(req,res)=>ok(res,{betCodes:await prisma.betCode.findMany({where:{userId:req.auth!.sub as any},orderBy:{createdAt:'desc'}})}))
r.get('/bet-codes/:code',async(req,res,next)=>{try{const x=await prisma.betCode.findUnique({where:{code:req.params.code}});if(!x){res.status(404).json({success:false,error:{code:'BET_CODE_NOT_FOUND',message:'Bet code not found.'}});return}ok(res,{betCode:x})}catch(e){next(e)}})
r.post('/bet-codes/convert',requireAuth,async(req,res)=>ok(res,{status:'READY',code:req.body?.code}))

r.get('/subscriptions/plans',async(_req,res,next)=>{try{ok(res,{plans:await prisma.subscriptionPlan.findMany({where:{isActive:true},orderBy:{price:'asc'}})})}catch(e){next(e)}})
r.get('/subscriptions/current',requireAuth,async(req,res,next)=>{try{ok(res,{subscription:await prisma.subscription.findFirst({where:{userId:req.auth!.sub as any},orderBy:{createdAt:'desc'}})})}catch(e){next(e)}})
r.post('/subscriptions/subscribe',requireAuth,async(req,res,next)=>{try{const plan=await prisma.subscriptionPlan.findUnique({where:{id:Number(req.body?.planId)}});if(!plan){res.status(404).json({success:false,error:{code:'PLAN_NOT_FOUND',message:'Subscription plan not found.'}});return}const start=new Date();const end=new Date(start);end.setDate(end.getDate()+plan.durationDays);const s=await prisma.subscription.create({data:{userId:req.auth!.sub as any,planId:plan.id,startsAt:start,endsAt:end}});ok(res,{subscription:s})}catch(e){next(e)}})
r.post('/subscriptions/cancel',requireAuth,async(req,res)=>ok(res,{status:'CANCEL_REQUESTED'}))
r.post('/subscriptions/change-plan',requireAuth,async(req,res)=>ok(res,{status:'PLAN_CHANGE_REQUESTED',planId:req.body?.planId}))

r.get('/wallet/balance',requireAuth,async(req,res,next)=>{try{const tx=await prisma.walletTransaction.findMany({where:{userId:req.auth!.sub as any,status:'SUCCESS'}});const balance=tx.reduce((n,x)=>n+(x.type==='CREDIT'?x.amount:-x.amount),0);ok(res,{balance})}catch(e){next(e)}})
r.get('/wallet/transactions',requireAuth,async(req,res,next)=>{try{ok(res,{transactions:await prisma.walletTransaction.findMany({where:{userId:req.auth!.sub as any},orderBy:{createdAt:'desc'}})})}catch(e){next(e)}})
r.post('/wallet/deposit',requireAuth,async(_req,res)=>res.status(503).json({success:false,error:{code:'PAYMENT_PROVIDER_NOT_CONFIGURED',message:'Configure Paystack or Flutterwave credentials before creating live deposits.'}}))
r.post('/wallet/verify-deposit',requireAuth,async(_req,res)=>res.status(503).json({success:false,error:{code:'PAYMENT_PROVIDER_NOT_CONFIGURED',message:'Payment provider is not configured.'}}))
r.post('/wallet/withdraw',requireAuth,async(_req,res)=>res.status(503).json({success:false,error:{code:'WITHDRAWAL_NOT_CONFIGURED',message:'Withdrawal provider is not configured.'}}))
r.get('/wallet/credits',requireAuth,async(req,res,next)=>{try{ok(res,{credits:0,userId:req.auth!.sub})}catch(e){next(e)}})
r.post('/wallet/credits/purchase',requireAuth,async(_req,res)=>res.status(503).json({success:false,error:{code:'PAYMENT_PROVIDER_NOT_CONFIGURED',message:'Payment provider is not configured.'}}))

r.get('/notifications',requireAuth,async(req,res,next)=>{try{ok(res,{notifications:await prisma.notification.findMany({where:{userId:req.auth!.sub as any},orderBy:{createdAt:'desc'}})})}catch(e){next(e)}})
r.get('/notifications/unread-count',requireAuth,async(req,res,next)=>{try{ok(res,{count:await prisma.notification.count({where:{userId:req.auth!.sub as any,readAt:null}})})}catch(e){next(e)}})
r.post('/notifications/:id/read',requireAuth,async(req,res,next)=>{try{const n=await prisma.notification.update({where:{id:Number(req.params.id)},data:{readAt:new Date()}});ok(res,{notification:n})}catch(e){next(e)}})
r.post('/notifications/read-all',requireAuth,async(req,res,next)=>{try{await prisma.notification.updateMany({where:{userId:req.auth!.sub as any,readAt:null},data:{readAt:new Date()}});ok(res,{updated:true})}catch(e){next(e)}})
r.get('/notifications/preferences',requireAuth,async(req,res)=>ok(res,{preferences:{}}))
r.put('/notifications/preferences',requireAuth,async(req,res)=>ok(res,{preferences:req.body||{}}))

r.get('/referrals/code',requireAuth,async(req,res,next)=>{try{let x=await prisma.referral.findFirst({where:{referrerId:req.auth!.sub as any}});if(!x){x=await prisma.referral.create({data:{referrerId:req.auth!.sub as any,referredUserId:req.auth!.sub as any,code:randomBytes(5).toString('hex').toUpperCase()}})}ok(res,{code:x.code,link:`/register?ref=${x.code}`})}catch(e){next(e)}})
r.get('/referrals/dashboard',requireAuth,async(req,res,next)=>{try{ok(res,{invited:await prisma.referral.count({where:{referrerId:req.auth!.sub as any}}),rewards:0})}catch(e){next(e)}})
r.get('/referrals/invited',requireAuth,async(req,res,next)=>{try{ok(res,{invited:await prisma.referral.findMany({where:{referrerId:req.auth!.sub as any}})})}catch(e){next(e)}})
r.get('/referrals/rewards',requireAuth,async(req,res,next)=>{try{ok(res,{rewards:await prisma.referral.findMany({where:{referrerId:req.auth!.sub as any}})})}catch(e){next(e)}})

r.get('/ads/placements',async(_req,res,next)=>{try{ok(res,{placements:await prisma.adPlacement.findMany({where:{isActive:true}})})}catch(e){next(e)}})
r.get('/ads/rewarded',requireAuth,async(_req,res)=>ok(res,{enabled:false}))
r.post('/ads/rewarded/claim',requireAuth,async(_req,res)=>ok(res,{claimed:false}))
r.post('/ads/impression',async(_req,res)=>ok(res,{recorded:true}))
r.post('/ads/click',async(_req,res)=>ok(res,{recorded:true}))

r.get('/gamification/profile',requireAuth,async(req,res,next)=>{try{const p=await prisma.gamificationProfile.upsert({where:{userId:req.auth!.sub as any},create:{userId:req.auth!.sub as any},update:{}});ok(res,{profile:p})}catch(e){next(e)}})
r.get('/gamification/leaderboard',async(_req,res)=>ok(res,{leaderboard:[]}))
r.get('/gamification/badges',async(_req,res)=>ok(res,{badges:[]}))
r.get('/gamification/challenges',async(_req,res)=>ok(res,{challenges:[]}))
r.get('/gamification/streak',requireAuth,async(req,res,next)=>{try{const p=await prisma.gamificationProfile.findUnique({where:{userId:req.auth!.sub as any}});ok(res,{streak:p?.streak||0})}catch(e){next(e)}})

r.get('/community/feed',async(_req,res,next)=>{try{const posts=await prisma.communityPost.findMany({where:{status:'PUBLISHED'},orderBy:{createdAt:'desc'},take:50});ok(res,{posts})}catch(e){next(e)}})
r.get('/community/posts/:id',async(req,res,next)=>{try{ok(res,{post:await prisma.communityPost.findUnique({where:{id:Number(req.params.id)}})})}catch(e){next(e)}})
r.post('/community/posts',requireAuth,async(req,res,next)=>{try{const post=await prisma.communityPost.create({data:{userId:req.auth!.sub as any,content:String(req.body?.content||'')}});ok(res,{post})}catch(e){next(e)}})
r.post('/community/posts/:id/like',requireAuth,async(_req,res)=>ok(res,{liked:true}))
r.post('/community/posts/:id/save',requireAuth,async(_req,res)=>ok(res,{saved:true}))
r.post('/community/posts/:id/comments',requireAuth,async(_req,res)=>ok(res,{comment:'accepted'}))
r.post('/community/posts/:id/report',requireAuth,async(_req,res)=>ok(res,{reported:true}))

r.get('/analysts',async(_req,res,next)=>{try{ok(res,{analysts:await prisma.analystProfile.findMany({where:{isVerified:true},orderBy:{rating:'desc'}})})}catch(e){next(e)}})
r.get('/analysts/:id',async(req,res,next)=>{try{ok(res,{analyst:await prisma.analystProfile.findUnique({where:{id:Number(req.params.id)}})})}catch(e){next(e)}})
r.get('/analysts/leaderboard',async(_req,res,next)=>{try{ok(res,{analysts:await prisma.analystProfile.findMany({orderBy:{rating:'desc'},take:50})})}catch(e){next(e)}})
r.get('/analysts/:id/predictions',async(req,res,next)=>{try{const a=await prisma.analystProfile.findUnique({where:{id:Number(req.params.id)}});ok(res,{predictions:a?await prisma.prediction.findMany({orderBy:{confidence:'desc'},take:50}):[]})}catch(e){next(e)}})
r.post('/analysts/:id/follow',requireAuth,async(_req,res)=>ok(res,{following:true}))
r.delete('/analysts/:id/follow',requireAuth,async(_req,res)=>ok(res,{following:false}))

r.get('/whatsapp/status',requireAuth,async(req,res,next)=>{try{ok(res,{linked:Boolean(await prisma.whatsAppLink.findUnique({where:{userId:req.auth!.sub as any}}))})}catch(e){next(e)}})
r.post('/whatsapp/link',requireAuth,async(req,res,next)=>{try{const x=await prisma.whatsAppLink.upsert({where:{userId:req.auth!.sub as any},create:{userId:req.auth!.sub as any,phone:String(req.body?.phone||'')},update:{phone:String(req.body?.phone||'')}});ok(res,{link:x})}catch(e){next(e)}})
r.post('/whatsapp/verify',requireAuth,async(req,res,next)=>{try{const x=await prisma.whatsAppLink.update({where:{userId:req.auth!.sub as any},data:{verifiedAt:new Date()}});ok(res,{link:x})}catch(e){next(e)}})
r.delete('/whatsapp/link',requireAuth,async(req,res,next)=>{try{await prisma.whatsAppLink.delete({where:{userId:req.auth!.sub as any}});ok(res,{unlinked:true})}catch(e){next(e)}})
r.get('/whatsapp/preferences',requireAuth,async(req,res)=>ok(res,{preferences:{}}))
r.put('/whatsapp/preferences',requireAuth,async(req,res,next)=>{try{const x=await prisma.whatsAppLink.update({where:{userId:req.auth!.sub as any},data:{preferences:req.body||{}}});ok(res,{preferences:x.preferences})}catch(e){next(e)}})

r.get('/admin/dashboard',requireAuth,requireRole('ADMIN'),async(_req,res,next)=>{try{const [users,fixtures,predictions]=await Promise.all([prisma.user.count(),prisma.fixture.count(),prisma.prediction.count()]);ok(res,{users,fixtures,predictions})}catch(e){next(e)}})
r.get('/admin/users',requireAuth,requireRole('ADMIN'),async(_req,res,next)=>{try{ok(res,{users:await prisma.user.findMany({select:{id:true,email:true,firstName:true,lastName:true,role:true,status:true,createdAt:true}})})}catch(e){next(e)}})
r.get('/admin/analytics',requireAuth,requireRole('ADMIN'),async(_req,res,next)=>{try{ok(res,{users:await prisma.user.count(),predictions:await prisma.prediction.count()})}catch(e){next(e)}})
r.get('/admin/feature-flags',requireAuth,requireRole('ADMIN'),async(_req,res)=>ok(res,{flags:{}}))
r.put('/admin/feature-flags/:key',requireAuth,requireRole('ADMIN'),async(req,res)=>ok(res,{key:req.params.key,value:req.body?.value}))
r.get('/admin/audit-logs',requireAuth,requireRole('ADMIN'),async(_req,res,next)=>{try{ok(res,{logs:await prisma.auditLog.findMany({orderBy:{createdAt:'desc'},take:100})})}catch(e){next(e)}})
export default r
