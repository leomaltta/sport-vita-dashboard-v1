import { PrismaClient } from '@prisma/client'

/**
 * Create Prisma Client with logging configuration
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

/**
 * Global type declaration
 */
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

/**
 * Singleton instance
 */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

/**
 * Attach to global in development
 */
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

/**
 * Graceful shutdown
 */
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}