import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

const callbackURL = new URL('/callback', process.env.HOST);

interface LoginPayload {
  redirectTo: string;
  callbackURL: string;
}

type LoginResult = Ht6Api.ApiResponse<{ url: string }>;

export async function middleware(request: NextRequest) {
  if (cookies().has('token') && cookies().has('refreshToken')) {
    return NextResponse.next();
  }

  const data = await fetchHt6<LoginResult, LoginPayload>('/auth/public/login', {
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
