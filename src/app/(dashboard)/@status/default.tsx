import { format } from 'date-fns/format';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Flex from '@/components/Flex';
import Text from '@/components/Text';

async function ApplicationStatus() {
  const { message } = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );
  const closeAt = format(
    message.computedApplicationDeadline,
    "MMMM d, y @ K:mma 'EST'",
  );

  return (
    <Flex direction="column" as="dl" gap="x-big">
      <Flex direction="column">
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="primary-600"
          as="dt"
        >
          Application Status:
        </Text>
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="error-600"
          as="dd"
        >
          {message.status.textStatus}
        </Text>
      </Flex>
      <Flex direction="column">
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="primary-600"
          as="dt"
        >
          Application Close:
        </Text>
        <Text
          textType="paragraph-sm"
          textWeight="semi-bold"
          textAlign="center"
          textColor="warning-600"
          as="dd"
        >
          {closeAt}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ApplicationStatus;
