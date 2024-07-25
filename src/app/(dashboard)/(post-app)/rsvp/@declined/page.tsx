import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Page } from '../shared';
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
          We’re sad to see you go :(
        </>
      }
    >
      <Text textAlign="center" as="p">
        Thank you for letting us know you will no longer be attending Hack the
        6ix 2024. We hope to see you next year!{' '}
      </Text>
      <Flex className={styles.email} align="center" direction="column" gap="sm">
        <Text textAlign="center" as="p">
          Have a question? Feel free to reach out to us!
        </Text>
        <div>
          <Button
            href="mailto:hello@hackthe6ix.com"
            target="_blank"
            rel="noreferrer noopener"
            buttonColor="primary"
            as="a"
          >
            <Flex gap="sm">
              <span>Email HT6</span>
              <Icon icon="send" />
            </Flex>
          </Button>
        </div>
      </Flex>
    </Page>
  );
}

export default RsvpPage;
