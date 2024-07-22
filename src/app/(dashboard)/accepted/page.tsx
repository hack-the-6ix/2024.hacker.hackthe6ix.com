'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { useSessionStorage } from '@/utils';

function AcceptedPage() {
  const { clear } = useSessionStorage();
  useEffect(() => clear(), [clear]);

  return (
    <Flex direction="column" justify="center" align="center" gap="2x-big">
      <Text
        textColor="warning-500"
        textWeight="bold"
        textType="heading-lg"
        textAlign="center"
        as="h1"
      >
        Congratulations, you’ve been{' '}
        <Text textColor="success-500">accepted</Text> 🎉
      </Text>
      <Flex direction="column" align="center" gap="sm">
        <Text textAlign="center" textColor="secondary-700" as="p">
          Welcome to Hack the 6ix 2024! We are excited to offer you the
          opportunity to hack with us. To confirm your attendance, please RSVP
          below by July 26.
        </Text>
      </Flex>
      <Button buttonType="contrast" as="button">
        I can no longer attend
      </Button>
      <Button buttonColor="primary" as="button">
        Accept invitation
      </Button>
    </Flex>
  );
}

export default AcceptedPage;
