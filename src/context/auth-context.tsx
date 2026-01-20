'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider Component
 * 
 * Wraps children with SessionProvider to enable authentication
 * Should be added to the root layout
 * 
 * @param children - Child components
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}