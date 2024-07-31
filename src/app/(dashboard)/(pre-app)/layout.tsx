import { ReactNode } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';

async function PreAppLayout({ children }: { children: ReactNode }) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');
  if (
    profile.status.accepted ||
    profile.status.rejected ||
    profile.status.declined ||
    profile.status.rsvpExpired
  ) {
    return redirect('/rsvp', RedirectType.replace);
  }

  if (profile.status.applicationExpired) {
    return redirect('/', RedirectType.replace);
  }

  return children;
}

export default PreAppLayout;
