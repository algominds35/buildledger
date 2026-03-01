import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for Supabase auth session cookie (sb-*-auth-token)
  const cookies = request.cookies.getAll()
  const hasSession = cookies.some(
    (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  )

  // Redirect unauthenticated users away from protected routes
  if (!hasSession && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (hasSession && (pathname === '/login' || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
