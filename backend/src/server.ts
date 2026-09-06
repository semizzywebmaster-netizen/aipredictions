import app from './app'
import { env } from './config/env'

const server = app.listen(env.PORT, () => {
  console.log(`AIPREDICTIONS backend listening on port ${env.PORT}`)
  console.log(`API base: ${env.API_PREFIX}`)
})

const shutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down gracefully...`)
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
