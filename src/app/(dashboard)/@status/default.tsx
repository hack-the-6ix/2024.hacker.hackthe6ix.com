import { fetchHt6 } from '@/api';
import Flex from '@/components/Flex';
import Text from '@/components/Text';

async function ApplicationStatus() {
  const res = await fetchHt6('/api/action/profile');
  const status = res.message.status.textStatus;
  const closeAt = new Date(
    res.message.computedApplicationDeadline,
  ).toLocaleDateString();

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
          {status}
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
