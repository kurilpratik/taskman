import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // server sets the refresh token as an httpOnly cookie named `refreshToken`.
  // Check that cookie here. Previously this checked `accessToken` which is
  // never stored as a cookie and caused an unconditional redirect back to
  // /login.
  const token = req.cookies.get('refreshToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
