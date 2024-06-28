'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';

export async function logout() {
  await fetchHt6('/auth/public/logout', {
    body: { refreshToken: cookies().get('refreshToken')!.value },
    method: 'POST',
  });

  cookies().delete('refreshToken');
  cookies().delete('token');
  return redirect(process.env.LANDING_HOST!);
}
