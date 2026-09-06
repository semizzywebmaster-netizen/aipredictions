import cors from 'cors'
import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import authRouter from './routes/auth'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

const healthHandler: RequestHandler = (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      service: 'aipredictions-backend',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  })
}

app.get(`${env.API_PREFIX}/health`, healthHandler)
app.use(`${env.API_PREFIX}/auth`, authRouter)

app.use(((_err, _req, res, _next) => {
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred.',
    },
  })
}) as ErrorRequestHandler)

export default app
