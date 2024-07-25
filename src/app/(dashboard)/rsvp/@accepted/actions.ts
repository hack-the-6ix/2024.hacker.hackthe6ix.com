'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';

export async function rsvp(attending: boolean) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  if (!profile.hackerApplication?.teamCode) {
    await fetchHt6<Ht6Api.ApiResponse<Ht6Api.Team>>('/api/action/createTeam', {
      method: 'POST',
    });
  }

  const res = await fetchHt6('/api/action/rsvp', {
    method: 'POST',
    body: { rsvp: { attending } },
  });

  revalidatePath('/rsvp', 'layout');
  return redirect(attending ? '/' : '/rsvp');
}
