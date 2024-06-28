'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { fetchHt6 } from '@/api';

interface CallbackPayload {
  code: string;
  state: string;
}

interface CallbackResult {
  status: number;
  message: {
    token: string;
    refreshToken: string;
    redirectTo: string;
  };
}

export async function setSession(state: string, code: string) {
  const res = await fetchHt6<CallbackResult, CallbackPayload>(
    '/auth/public/callback',
    { body: { state, code }, method: 'POST' },
  );

  if (res.status !== 200) {
    throw new Error('Bad Session :c');
  }

  cookies().set('refreshToken', res.message.refreshToken);
  cookies().set('token', res.message.token);

  return res.message.redirectTo ?? '/';
}
