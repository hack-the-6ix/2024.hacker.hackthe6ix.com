import { ReactNode } from 'react';

interface TeamPageProps {
  join: ReactNode;
  team: ReactNode;
}
function TeamPage({ join, team }: TeamPageProps) {
  const hasTeam = false;
  return hasTeam ? team : join;
}

export default TeamPage;
