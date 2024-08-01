import { ReactNode } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';

interface DashboardProps {
  children: ReactNode;
}
async function Dashboard({ children }: DashboardProps) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  if (profile.status.confirmed) {
    return children;
  } else if (profile.status.applied && !profile.status.applicationExpired) {
    return redirect('/rsvp', RedirectType.replace);
  } else if (profile.status.applicationExpired) {
    return redirect('/closed', RedirectType.replace);
  } else if (profile.status.applied && !profile.status.canRSVP) {
    return redirect('/about', RedirectType.replace);
  }

  return children;
}

export default Dashboard;
