import { format } from 'date-fns/format';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './default.module.scss';

async function ApplicationStatus() {
  const { message } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );
  // const closeAt = format(
  //   message.computedApplicationDeadline,
  //   "MMM d @ K:mma 'EST'",
  // );

  return (
    <Flex className={styles.container} direction="column" as="dl" gap="x-big">
      <Flex className={styles.column} direction="column" gap="2x-sm">
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="primary-600"
          as="dt"
        >
          Apps Status:
        </Text>
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor={message.status.applied ? 'success-500' : 'error-600'}
          as="dd"
        >
          {message.status.textStatus}
        </Text>
      </Flex>
      <Flex className={styles.column} direction="column" gap="2x-sm">
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="primary-600"
          as="dt"
        >
          Apps Close:
        </Text>
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="warning-600"
          as="dd"
        >
          {/* {closeAt} */}
          Jul 18 @ 11:59PM EST
        </Text>
      </Flex>
    </Flex>
  );
}

export default ApplicationStatus;
