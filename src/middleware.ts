import { NextResponse } from 'next/server';

interface AuthPayload {
  redirectTo: string;
  callbackURL: string;
}

interface AuthResult {
  status: number;
  message: {
    url: string;
  };
}

export async function middleware() {
  const isAuthenticated = true; // TODO: Add logic for auth
  if (isAuthenticated) return NextResponse.next();

  const loginURL = new URL('/auth/public/login', process.env.API_HOST);
  const callbackURL = new URL('/callback', process.env.HOST);

  const res = await fetch(loginURL.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectTo: process.env.HOST!,
      callbackURL: callbackURL.href,
    } satisfies AuthPayload),
  });

  const data = await res.json<AuthResult>();
  if (data.status !== 200) {
    throw new Error('Unable to auth. RIP');
  }
  return NextResponse.redirect(new URL(data.message.url));
}

export const config = {
  matcher: ['/', '/about', '/experiences', '/ht6', '/team'],
};
