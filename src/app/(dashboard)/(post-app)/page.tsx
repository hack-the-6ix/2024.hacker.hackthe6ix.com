import { redirect, RedirectType } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

async function Dashboard() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');
  const toRsvp = profile.status.accepted && profile.status.canRSVP;
  const confirmedBad = profile.status.declined || profile.status.waitlisted;
  const inApps = !profile.status.isRSVPOpen && !confirmedBad && !toRsvp;

  if (inApps) {
    return redirect('/team', RedirectType.replace);
  } else if (toRsvp || confirmedBad) {
    return redirect('/rsvp', RedirectType.replace);
  } else if (!profile.status.applied) {
    return redirect('/done', RedirectType.replace);
  } else if (profile.status.applied && !profile.status.canRSVP) {
    return redirect('/about', RedirectType.replace);
  }
}

export default Dashboard;
