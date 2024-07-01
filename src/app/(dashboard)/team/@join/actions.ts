'use server';

import { revalidatePath } from 'next/cache';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

export async function createTeam() {
  const { status } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.Team>>(
    '/api/action/createTeam',
    { method: 'POST' },
  );
  revalidatePath('/team');
  return status;
}

export async function joinTeam(_: unknown, formData: FormData) {
  const teamCode = formData.get('code')?.toString() ?? '';
  const { message, status } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.Team>,
    { teamCode: string }
  >('/api/action/joinTeam', { body: { teamCode }, method: 'POST' });

  if (status !== 200) {
    return { error: message as unknown as string };
  }

  revalidatePath('/team');
}
