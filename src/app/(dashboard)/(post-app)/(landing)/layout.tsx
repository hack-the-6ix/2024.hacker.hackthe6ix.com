import { ReactNode } from 'react';
import Flex from '@/components/Flex';

interface DashboardProps {
  discord: ReactNode;
  header: ReactNode;
}
async function Dashboard({ header, discord }: DashboardProps) {
  return (
    <Flex direction="column" gap="x-lg">
      {header}
      {discord}
    </Flex>
  );
}

export default Dashboard;
