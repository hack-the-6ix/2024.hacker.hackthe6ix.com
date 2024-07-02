import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

const callbackURL = new URL('/callback', process.env.HOST);

interface LoginPayload {
  redirectTo: string;
  callbackURL: string;
}

type LoginResult = Ht6Api.ApiResponse<{ url: string }>;

export async function middleware(request: NextRequest) {
  const isAuth = cookies().has('token') && cookies().has('refreshToken');
  const url = new URL(request.url).pathname;

  if (isAuth) {
    const userRequest = await fetchHt6<
      Ht6Api.ApiResponse<Ht6Api.HackerProfile>
    >('/api/action/profile');

    if (userRequest.status === 200) {
      return NextResponse.next();
    }

    // Logout and reset
    await fetchHt6('/auth/public/logout', {
      body: { refreshToken: request.cookies.get('refreshToken')!.value },
      method: 'POST',
    });
  }

  const data = await fetchHt6<LoginResult, LoginPayload>('/auth/public/login', {
    body: {
      callbackURL: callbackURL.href,
      redirectTo: url,
    },
    method: 'POST',
  });

  if (data.status !== 200) {
    throw new Error('Unable to auth. RIP');
  }

  const response = NextResponse.redirect(new URL(data.message.url));
  response.cookies.delete('refreshToken');
  response.cookies.delete('token');
  return response;
}

export const config = {
  matcher: ['/about', '/experiences', '/ht6', '/team'],
};
