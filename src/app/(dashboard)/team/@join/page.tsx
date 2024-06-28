import Link from 'next/link';
import Button from '@/components/Button';
import { TeamLayout } from '../components';
import { CreateTeam, JoinTeamForm } from './client';

function JoinTeam() {
  return (
    <TeamLayout
      label="Join a Team"
      description="Already have a team code? Enter it below!"
      leftAction={
        <Button buttonType="secondary" as={Link} href="/about">
          Skip to my application
        </Button>
      }
      rightAction={<CreateTeam />}
    >
      <JoinTeamForm />
    </TeamLayout>
  );
}

export default JoinTeam;
