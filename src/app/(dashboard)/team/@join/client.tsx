'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { createTeam, joinTeam } from './actions';
import styles from './client.module.scss';

export function CreateTeam() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await createTeam();
      }}
      loading={loading && 'Creating team...'}
      buttonColor="primary"
    >
      Create a team
    </Button>
  );
}

export function JoinTeamForm() {
  const [res, formAction] = useFormState(joinTeam, null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!res) return;
    setError(res.error);
  }, [res]);

  return (
    <Flex className={styles.frame} direction="column" gap="x-sm">
      <form
        onSubmit={() => setError(null)}
        action={formAction}
        className={styles.content}
      >
        <Input
          label="Team code"
          inputProps={{
            name: 'code',
            required: true,
            placeholder: 'OWO123',
            onChange: () => setError(null),
          }}
        />
        <JoinTeamAction />
      </form>
      {error && (
        <Text
          textWeight="semi-bold"
          textColor="error-500"
          textType="label"
          as="p"
        >
          {error}
        </Text>
      )}
    </Flex>
  );
}

export function JoinTeamAction() {
  const { pending } = useFormStatus();
  return (
    <Button
      buttonColor="primary"
      loading={pending && 'Joining...'}
      type="submit"
    >
      Join team
    </Button>
  );
}
