import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { MediaFooter, Page } from '../shared';
import styles from './page.module.scss';

async function RsvpPage() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <Page
      footer={<MediaFooter />}
      name={profile.firstName}
      title="We're sad to see you go :c"
    >
      <Text textAlign="center" as="p">
        Thank you for letting us know you will no longer be attending Hack The
        6ix 2024. We hope to see you next year!
      </Text>
    </Page>
  );
}

export default RsvpPage;
