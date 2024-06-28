import Link from 'next/link';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { TeamLayout } from '../components';
import { LeaveTeam } from './client';
import styles from './page.module.scss';

async function YourTeam() {
  const { message } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.Team>>(
    '/api/action/getTeam',
  );

  return (
    <TeamLayout
      label="Your Team"
      leftAction={<LeaveTeam />}
      rightAction={
        <Button buttonColor="primary" as={Link} href="about">
          To my application
        </Button>
      }
    >
      <Flex justify="center" gap="x-big">
        <Flex
          className={styles.section}
          direction="column"
          align="center"
          gap="sm"
        >
          <Text
            textColor="secondary-700"
            textType="subtitle-sm"
            textWeight="bold"
            as="h2"
          >
            Team Code
          </Text>
          <Text
            textColor="warning-500"
            textWeight="medium"
            textType="paragraph-lg"
            as="p"
          >
            {message.code}
          </Text>
        </Flex>
        <Flex
          className={styles.section}
          direction="column"
          align="center"
          gap="sm"
        >
          <Text
            textColor="secondary-700"
            textType="subtitle-sm"
            textWeight="bold"
            as="h2"
          >
            Members ({message.memberNames?.length ?? 0}/4)
          </Text>
          <Flex className={styles.members} direction="column" gap="sm" as="ul">
            {message.memberNames?.map((member, idx) => (
              <Text
                textColor="secondary-700"
                textType="paragraph-lg"
                as="li"
                key={idx}
              >
                {member}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </TeamLayout>
  );
}

export default YourTeam;
