import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

/**
 * Middleware function
 * Checks authentication and authorization for protected routes
 */
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl
    const token = request.nextauth.token

    /**
     * Admin-only routes
     * Only users with 'admin' role can access
     */
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }

    /**
     * Sport-specific routes with role-based access
     * Each sport can only be accessed by admin or sport-specific teacher
     */
    const sportRoutes: Record<string, string[]> = {
      futsal: ['admin', 'proffut'],
      basquete: ['admin', 'profbas'],
      danca: ['admin', 'profdanca'],
      gr: ['admin', 'profgr'],
      handebol: ['admin', 'profhand'],
      judo: ['admin', 'profjudo'],
      karate: ['admin', 'profkarate'],
      natacao: ['admin', 'profnata'],
      voleibol: ['admin', 'profvolei'],
    }

    // Check sport-specific access
    for (const [sport, allowedRoles] of Object.entries(sportRoutes)) {
      if (
        pathname.endsWith(`/${sport}`) &&
        !allowedRoles.includes(token?.role as string)
      ) {
        return NextResponse.rewrite(new URL('/denied', request.url))
      }
    }

    // Allow access if no restrictions matched
    return NextResponse.next()
  },
  {
    /**
     * Callbacks
     */
    callbacks: {
      /**
       * Authorized callback
       * Returns true if user has a valid token
       */
      authorized: ({ token }) => !!token,
    },

    /**
     * Secret for JWT verification
     */
    secret: process.env.NEXTAUTH_SECRET,
  },
)

/**
 * Matcher configuration
 * Specifies which routes should be protected by middleware
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/esportes/:path*',
    '/professores/:path*',
    '/alunos/:path*',
    '/admin/:path*',
  ],
}