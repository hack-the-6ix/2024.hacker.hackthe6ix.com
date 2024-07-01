'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import { leaveTeam } from './actions';

export function LeaveTeam() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await leaveTeam();
      }}
      loading={loading && 'Leaving team...'}
      buttonType="secondary"
    >
      <Flex as="span" align="center" gap="sm">
        <Icon icon="logout" />
        <span>Leave team</span>
      </Flex>
    </Button>
  );
}
