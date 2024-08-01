import { ReactNode } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';

interface RsvpPageProps {
  closed: ReactNode;
  declined: ReactNode;
  accepted: ReactNode;
  children: ReactNode;
  rejected: ReactNode;
  waitlisted: ReactNode;
}
async function RsvpPage({
  children,
  closed,
  declined,
  accepted,
  rejected,
  waitlisted,
}: RsvpPageProps) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  if (profile.status.confirmed) {
    return redirect('/', RedirectType.replace);
  }

  if (profile.status.rsvpExpired) {
    return closed;
  }

  if (profile.status.declined) {
    return declined;
  }

  if (profile.status.accepted) {
    return accepted;
  }

  if (profile.status.rejected) {
    return rejected;
  }

  if (profile.status.waitlisted) {
    return waitlisted;
  }

  return children;
}

export default RsvpPage;
