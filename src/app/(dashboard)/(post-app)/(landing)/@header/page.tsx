import Link from 'next/link';
import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';
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
          event starts on <Text textColor="warning-400">August 2nd</Text>.
        </Text>
        <Text
          className={styles.location}
          textColor="neutral-700"
          textWeight="medium"
          as="p"
        >
          <Flex align="center" inline gap="2x-sm" as="span">
            <Icon icon="location_on" /> Event Location:
          </Flex>
          <a
            href="https://maps.app.goo.gl/A3Q1xfLvPiJuVjnj6"
            className={styles.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Bahen Centre for Information Technology, University of Toronto,
            Toronto, Ontario, Canada
          </a>
        </Text>
      </Flex>
      <hr className={styles.divider} />
    </>
  );
}

export default HeaderSection;
