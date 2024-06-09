import Flex from '@/components/Flex';
import Text from '@/components/Text';

function mockApi<T>(result: T, delay = Math.random() * 2000) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(result), delay);
  });
}

async function ApplicationStatus() {
  const [status, closeAt] = await Promise.all([
    mockApi('Not submitted'),
    mockApi('July 21, 2023 @ 11:59PM EST'),
  ]);

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
