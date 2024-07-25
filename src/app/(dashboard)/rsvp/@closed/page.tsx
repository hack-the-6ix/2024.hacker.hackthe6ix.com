import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './page.module.scss';

function RsvpClosed() {
  return (
    <Flex
      className={styles.container}
      direction="column"
      justify="center"
      align="center"
      gap="2x-big"
    >
      <Text
        textColor="warning-500"
        textWeight="bold"
        textType="heading-lg"
        textAlign="center"
        as="h1"
      >
        RSVPs are closed!
      </Text>
      <Flex direction="column" align="center" gap="sm">
        <Text textAlign="center" textColor="secondary-700" as="p">
          Thank you for your interest in Hack the 6ix! Unfortunately, RSVPs are
          now closed. We hope to see you next year!
        </Text>
      </Flex>
      <Button buttonColor="primary" as="a" href={process.env.LANDING_HOST}>
        Back to Home
      </Button>
    </Flex>
  );
}

export default RsvpClosed;
