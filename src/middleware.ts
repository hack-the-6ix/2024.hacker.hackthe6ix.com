import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchJSON } from './api';

const loginURL = new URL('/auth/public/login', process.env.API_HOST);
const callbackURL = new URL('/callback', process.env.HOST);

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

export async function middleware(request: NextRequest) {
  const isAuthenticated = true; // TODO: Add logic for auth

  if (isAuthenticated) return NextResponse.next();
  const data = await fetchJSON<AuthPayload, AuthResult>(loginURL, {
    body: {
      redirectTo: new URL(request.url).pathname,
      callbackURL: callbackURL.href,
    },
    method: 'POST',
  });

  if (data.status !== 200) {
    throw new Error('Unable to auth. RIP');
  }
  return NextResponse.redirect(new URL(data.message.url));
}

export const config = {
  matcher: ['/', '/about', '/experiences', '/ht6', '/team'],
};
