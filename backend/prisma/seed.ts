import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.databaseHealth.create({ data: {} })
  console.log('Database seed completed.')
}

main()
  .catch((error) => {
    console.error('Database seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
