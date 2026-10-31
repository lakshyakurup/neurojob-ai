import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '../utils/supabase/middleware'

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Keep Supabase auth cookies fresh (no-op when env vars are missing)
  return updateSession(request)
})

export const config = {
  matcher: [
    /*
     * Match all request paths except static files.
     * Clerk + Supabase session refresh both run on these routes.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
