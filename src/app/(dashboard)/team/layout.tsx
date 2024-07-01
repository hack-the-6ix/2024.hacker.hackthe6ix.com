import { ReactNode } from 'react';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

interface TeamPageProps {
  join: ReactNode;
  team: ReactNode;
}
async function TeamPage({ join, team }: TeamPageProps) {
  const { status } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.Team>>(
    '/api/action/getTeam',
  );

  const hasTeam = status === 200;
  return hasTeam ? team : join;
}

export default TeamPage;
