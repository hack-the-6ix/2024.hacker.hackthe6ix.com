'use server';

import { revalidatePath } from 'next/cache';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

export async function leaveTeam() {
  const { status } = await fetchHt6<Ht6Api.ApiResponse<string>>(
    '/api/action/leaveTeam',
    {
      method: 'POST',
    },
  );
  revalidatePath('/team');
  return status;
}
