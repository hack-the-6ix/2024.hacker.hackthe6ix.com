import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { TeamLayout } from '../components';

function YourTeam() {
  return (
    <TeamLayout
      label="Your Team"
      leftAction={{
        children: 'Leave team',
        type: 'button',
      }}
      rightAction={{
        children: 'To application',
        type: 'button',
      }}
    >
      <Flex>
        <Flex>
          <Text>Team Code</Text>
          <Text>OWOUWU</Text>
        </Flex>
        <Flex>
          <Text>Members (2/4)</Text>
          <Text>John Doe</Text>
        </Flex>
      </Flex>
    </TeamLayout>
  );
}

export default YourTeam;
