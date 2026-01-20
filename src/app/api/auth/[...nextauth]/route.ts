import NextAuth from 'next-auth'
import { authOptions } from './options'

/**
 * Create NextAuth handler with our configuration
 */
const handler = NextAuth(authOptions)

/**
 * Export handlers for GET and POST requests
 * Required by Next.js App Router
 */
export { handler as GET, handler as POST }