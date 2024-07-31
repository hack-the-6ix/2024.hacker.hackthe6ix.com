import Link from 'next/link';
import { isBefore } from 'date-fns/isBefore';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { TeamLayout } from '../components';
import { CreateTeam, JoinTeamForm } from './client';
import styles from './page.module.scss';

async function JoinTeam() {
  const { message } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );
  const canTeam = !isBefore(new Date(), message.computedApplicationOpen);

  return (
    <TeamLayout
      label="Join a Team"
      description="Already have a team code? Enter it below!"
      leftAction={
        <Button buttonType="secondary" as={Link} href="/about">
          {canTeam ? 'Skip to my application' : 'To my application'}
        </Button>
      }
      rightAction={canTeam ? <CreateTeam /> : null}
    >
      {canTeam ?
        <JoinTeamForm />
      : <Flex
          className={styles.full}
          justify="center"
          align="center"
          direction="column"
          gap="m"
        >
          <Text
            textColor="secondary-700"
            textAlign="center"
            textType="display"
            as="h1"
          >
            Team formation is closed
          </Text>
          <Text
            textColor="secondary-700"
            textType="paragraph-lg"
            textWeight="medium"
            textAlign="center"
            as="p"
          >
            Still want to be part of a team? Don&apos;t worry! You can still
            form a team during the event.
          </Text>
        </Flex>
      }
    </TeamLayout>
  );
}

export default JoinTeam;
