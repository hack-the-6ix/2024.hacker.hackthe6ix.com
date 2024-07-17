'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { useSessionStorage } from '@/utils';
import styles from './page.module.scss';

function DonePage() {
  const { clear } = useSessionStorage();
  useEffect(() => clear(), [clear]);

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
        Applications are closed!
      </Text>
      <Flex direction="column" align="center" gap="sm">
        <Text textAlign="center" textColor="secondary-700" as="p">
          Thank you for completing the application! You will receive an email
          confirmation soon.
        </Text>

        <Text textAlign="center" textColor="secondary-700" as="p">
          Thank you for your interest in Hack the 6ix! Unfortunately,
          applications are now closed. We hope to see you next year!
        </Text>
      </Flex>
      <Button buttonColor="primary" as="a" href={process.env.LANDING_HOST}>
        Back to Home
      </Button>
    </Flex>
  );
}

export default DonePage;
