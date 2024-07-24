import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

interface RsvpPageProps {
  closed: ReactNode;
  declined: ReactNode;
  accepted: ReactNode;
  children: ReactNode;
}
async function RsvpPage({
  children,
  closed,
  declined,
  accepted,
}: RsvpPageProps) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  if (profile.status.confirmed) {
    return redirect('/');
  }

  if (profile.status.canRSVP && !profile.status.isRSVPOpen) {
    return closed;
  }

  if (profile.status.declined) {
    return declined;
  }

  if (profile.status.accepted) {
    return accepted;
  }

  return children;
}

export default RsvpPage;
