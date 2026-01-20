import { defineConfig } from '@prisma/client'

export default defineConfig({
  /**
   * Database connection configuration
   * In Prisma 7, URLs are no longer in schema.prisma
   */
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      // Direct URL for migrations (bypasses connection pooling)
      directUrl: process.env.DIRECT_URL,
    },
  },

  /**
   * Generator configuration
   */
  generator: {
    client: {
      // Preview features
      previewFeatures: ['fullTextSearch', 'fullTextIndex'],
    },
  },
})