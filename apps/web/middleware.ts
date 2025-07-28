import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
 
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const url = request.nextUrl

    // Define which routes require authentication
    const protectedRoutes = ['/dashboard', '/profile', '/uploadfile', '/ask-pdf']
    const authRoutes = ['/sign-in', '/sign-up']
    
    const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => url.pathname.startsWith(route))

    // Redirect authenticated users away from auth pages
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect unauthenticated users from protected pages
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
        '/dashboard/:path*',
        '/profile/:path*', 
        '/uploadfile/:path*',
        '/ask-pdf/:path*',
        '/sign-in',
        '/sign-up'
    ],
}