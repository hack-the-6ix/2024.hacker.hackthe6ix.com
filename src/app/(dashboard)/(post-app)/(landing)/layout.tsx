import { ReactNode } from 'react';
import Flex from '@/components/Flex';

interface DashboardProps {
  discord: ReactNode;
  guide: ReactNode;
  devpost: ReactNode;
  header: ReactNode;
}
function Dashboard({ header, discord, guide, devpost }: DashboardProps) {
  return (
    <Flex direction="column" gap="x-lg">
      {header}
      <Flex direction="column" gap="m">
        {discord}
        {guide}
        {devpost}
      </Flex>
    </Flex>
  );
}

export default Dashboard;
