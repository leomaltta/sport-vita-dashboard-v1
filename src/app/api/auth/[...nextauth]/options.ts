

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from '../../../../../prisma/client'

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  /**
   * Custom pages for authentication flow
   */
  pages: {
    signIn: '/login',
    error: '/login',
  },

  /**
   * Prisma adapter for database sessions
   */
  adapter: PrismaAdapter(prisma),

  /**
   * Authentication providers
   */
  providers: [
    /**
     * Credentials Provider
     * Allows authentication with email and password
     */
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'nome@exemplo.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      /**
       * Authorize function
       * Validates user credentials and returns user object
       * 
       * @param credentials - User credentials (email, password)
       * @returns User object if valid, null if invalid
       */
      async authorize(credentials) {
        // Validate that credentials exist
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // Return null if user not found
        if (!user) {
          return null
        }

        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        // Return null if password is invalid
        if (!isPasswordValid) {
          return null
        }

        // Return user object (without password)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      },
    }),
  ],

  /**
   * Callbacks
   * Modify JWT token and session data
   */
  callbacks: {
    /**
     * JWT Callback
     * Called whenever a JWT is created or updated
     * Adds custom properties to the token
     * 
     * @param token - JWT token
     * @param user - User object (available on sign in)
     * @param trigger - Action that triggered the callback
     * @param session - Session data (available on update)
     */
    async jwt({ token, user, trigger, session }) {
      // Handle session update
      if (trigger === 'update' && session) {
        return { ...token, ...session.user }
      }

      // Add role to token on sign in
      if (user) {
        token.role = user.role
      }

      return token
    },

    /**
     * Session Callback
     * Called whenever a session is checked
     * Adds custom properties to the session
     * 
     * @param session - Session object
     * @param token - JWT token
     */
    async session({ session, token }) {
      // Add role to session user
      if (session?.user) {
        session.user.role = token.role as string
      }

      return session
    },
  },

  /**
   * Session strategy
   * Use JWT for stateless sessions
   */
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  /**
   * Secret for JWT encryption
   * Must be set in production
   */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * Debug mode
   * Enable detailed logging in development
   */
  debug: process.env.NODE_ENV === 'development',
}