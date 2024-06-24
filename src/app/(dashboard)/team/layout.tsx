import { ReactNode } from 'react';

interface TeamPageProps {
  join: ReactNode;
  team: ReactNode;
}
function TeamPage({ join, team }: TeamPageProps) {
  const hasTeam = true;
  return hasTeam ? team : join;
}

export default TeamPage;
