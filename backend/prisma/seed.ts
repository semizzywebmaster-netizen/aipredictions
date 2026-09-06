import { PrismaClient, UserRole, UserStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Deliberately create no usable credentials in source control.
  // A real administrator is provisioned by the authentication/admin setup phases.
  const existingAdmin = await prisma.user.findFirst({ where: { role: UserRole.ADMIN } })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: 'admin@example.invalid',
        passwordHash: 'DISABLED_PLACEHOLDER',
        role: UserRole.ADMIN,
        status: UserStatus.DISABLED,
      },
    })
  }

  console.log('Phase 03 seed completed. No usable administrator credentials were created.')
}

main()
  .catch((error) => {
    console.error('Database seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
