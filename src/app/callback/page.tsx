'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { setSession } from './actions';
import styles from './page.module.scss';

// TODO: Added better error boundary

interface CallbackPageProps {
  searchParams: {
    state: string; // The params
    session_state: string;
    code: string;
  };
}

function CallbackPage({ searchParams }: CallbackPageProps) {
  const router = useRouter();
  const stale = useRef(false);
  useEffect(() => {
    if (stale.current) return;
    stale.current = true;

    if (!searchParams.state || !searchParams.code) {
      return router.replace('/');
    }
    setSession(searchParams.state, searchParams.code);
  }, [searchParams, router]);

  return (
    <Flex
      className={styles.container}
      direction="column"
      gap="m"
      justify="center"
      align="center"
    >
      <Icon className={styles.icon} color="neutral-300" icon="sync" />
      <Text textType="subtitle-lg" textColor="neutral-300">
        Logging in...
      </Text>
    </Flex>
  );
}

export default CallbackPage;
