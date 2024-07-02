'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

interface CallbackPayload {
  code: string;
  state: string;
}

type CallbackResult = Ht6Api.ApiResponse<{
  token: string;
  refreshToken: string;
  redirectTo: string;
}>;

export async function setSession(state: string, code: string) {
  const isAuth = cookies().has('token') && cookies().has('refreshToken');
  let redirectUrl = '/team';
  if (!isAuth) {
    const res = await fetchHt6<CallbackResult, CallbackPayload>(
      '/auth/public/callback',
      { body: { state, code }, method: 'POST' },
    );

    if (res.status !== 200) {
      throw new Error('Bad Session :c');
    }

    console.log(res);
    cookies().set('refreshToken', res.message.refreshToken);
    cookies().set('token', res.message.token);
    redirectUrl = res.message.redirectTo ?? '/team';
  }

  console.log(redirectUrl);
  redirect(redirectUrl, RedirectType.replace);
}
