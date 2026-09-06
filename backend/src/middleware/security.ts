import type { RequestHandler } from 'express'
import { randomUUID } from 'node:crypto'
const buckets=new Map<string,{count:number;reset:number}>()
export const requestId:RequestHandler=(req,res,next)=>{const id=req.header('x-request-id')||randomUUID();res.setHeader('x-request-id',id);next()}
export const rateLimit=(windowMs=60_000,max=120):RequestHandler=>(req,res,next)=>{const key=req.ip||'unknown';const now=Date.now();const current=buckets.get(key);if(!current||current.reset<=now){buckets.set(key,{count:1,reset:now+windowMs});next();return}current.count+=1;if(current.count>max){res.status(429).json({success:false,error:{code:'RATE_LIMITED',message:'Too many requests. Please try again later.'}});return}next()}
setInterval(()=>{const now=Date.now();for(const [key,v] of buckets)if(v.reset<=now)buckets.delete(key)},60_000).unref()
