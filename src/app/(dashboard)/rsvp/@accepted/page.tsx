import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { Page } from '../shared';
import { Accept, Decline } from './client';
import styles from './page.module.scss';

async function RsvpPage() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <Page
      name={profile.firstName}
      title={
        <>
          Congratulations, you&apos;ve been{' '}
          <Text textColor="success-500">accepted</Text> 🎉
        </>
      }
      welcome
    >
      <Text textAlign="center" as="p">
        Welcome to Hack the 6ix 2024! We are excited to offer you the
        opportunity to hack with us.
      </Text>
      <Text textAlign="center" as="p">
        To confirm your attendance, please RSVP below.
      </Text>
      <Flex className={styles.actions} justify="center" gap="big">
        <Decline />
        <Accept />
      </Flex>
    </Page>
  );
}

export default RsvpPage;
