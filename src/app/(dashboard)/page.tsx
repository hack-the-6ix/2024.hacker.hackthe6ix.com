import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

async function DashboardPage() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  console.log(profile.status);

  if (profile.status.canApply) {
    return redirect('/team');
  } else if (!profile.status.accepted) {
    return redirect('/rsvp');
  }
}

export default DashboardPage;
