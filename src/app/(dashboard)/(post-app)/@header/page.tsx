import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './page.module.scss';

async function HeaderSection() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <>
      <Flex direction="column" gap="sm">
        <Text
          textColor="secondary-700"
          textWeight="bold"
          textType="heading-lg"
          as="h1"
        >
          Welcome back, {profile.firstName}
        </Text>
        <Text textColor="neutral-700" textWeight="medium" as="p">
          Explore your dashboard below to find out what you can do before the
          event starts on <Text textColor="warning-400">August 18th</Text>.
        </Text>
        <Text
          className={styles.location}
          textColor="neutral-700"
          textWeight="medium"
          as="p"
        >
          <Flex align="center" inline gap="2x-sm">
            <Icon icon="location_on" /> Event Location:
          </Flex>
          <Button
            buttonType="tertiary"
            href="https://maps.app.goo.gl/fSs4YhVQ5g8ZwxxK6"
            className={styles.link}
            rel="noopener noreferrer"
            target="_blank"
            as="a"
          >
            George Vari Engineering and Computing Centre, Toronto, ON
          </Button>
        </Text>
      </Flex>
      <hr className={styles.divider} />
    </>
  );
}

export default HeaderSection;
