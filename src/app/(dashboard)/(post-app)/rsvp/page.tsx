import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Text from '@/components/Text';
import { EmailUs, Page } from './shared';

async function RsvpPage() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <Page
      name={profile.firstName}
      title={
        <>
          You have been placed on the{' '}
          <Text textColor="warning-400">waitlist</Text>
        </>
      }
      footer={<EmailUs />}
      welcome
    >
      <Text textAlign="center" as="p">
        We received an overwhelming amount of applications this year and have
        placed you on the waitlist. We&apos;ll let you know if a spot opens up,
        so make sure to check your inbox!
      </Text>
    </Page>
  );
}

export default RsvpPage;
