'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as R from 'ramda';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

export async function logout() {
  await fetchHt6('/auth/public/logout', {
    body: { refreshToken: cookies().get('refreshToken')!.value },
    method: 'POST',
  });

  cookies().delete('refreshToken');
  cookies().delete('token');
  return redirect(process.env.LANDING_HOST!);
}

export async function patchApplication(
  data: Partial<Ht6Api.HackerApplication>,
) {
  const application = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );

  const updatedApplication = R.omit(['lastUpdated', 'teamCode'], {
    ...(application.message.hackerApplication ?? {}),
    ...data,
  });

  return R.reject(R.isEmpty, {
    ...updatedApplication,
    emergencyContact: R.reject(
      R.isEmpty,
      updatedApplication.emergencyContact as any,
    ),
  }) as Partial<Ht6Api.HackerApplication>;
}
