import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // server sets the refresh token as an httpOnly cookie named `refreshToken`.
  // Check that cookie here. Previously this checked `accessToken` which is
  // never stored as a cookie and caused an unconditional redirect back to
  // /login.
  const token = req.cookies.get('refreshToken')?.value;
  console.log(`Check token: ${token}`)
  // If user is logged in and tries to access login/register, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect dashboard routes - redirect to login if no token
  // Only check this for dashboard routes, not for login/register
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
