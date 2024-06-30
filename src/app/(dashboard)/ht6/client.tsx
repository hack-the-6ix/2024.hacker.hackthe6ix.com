'use client';

import { FormEvent, ReactNode, useState } from 'react';
import { useFormStatus } from 'react-dom';
import * as R from 'ramda';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import { InputLikePublicProps } from '@/components/InputLike';
import Text from '@/components/Text';
import styles from './client.module.scss';

export function SubmitApplication() {
  const { pending } = useFormStatus();
  return (
    <Button
      loading={pending && 'Saving...'}
      buttonColor="primary"
      type="submit"
    >
      Submit Application
    </Button>
  );
}

export interface ChecklistProps extends InputLikePublicProps {
  limit?: number;
  name: string;
  required?: boolean;
  options: {
    label: ReactNode;
    value: string;
  }[];
}
export function Checklist({
  label,
  required,
  options,
  name,
  limit = 3,
}: ChecklistProps) {
  const [checked, setChecked] = useState(new Array(options.length).fill(false));

  const handleOnChange = (pos: number) => (e: FormEvent<HTMLDivElement>) => {
    setChecked((oldChecked) => {
      const isUnderLimit = R.count(Boolean, oldChecked) < limit;
      return R.assoc(pos, !oldChecked[pos] && isUnderLimit, oldChecked);
    });
  };

  return (
    <Flex direction="column" role="group" gap="sm" data-full>
      <Text
        className={styles.label}
        textColor="secondary-700"
        textType="paragraph-lg"
        textWeight="semi-bold"
        as="legend"
      >
        <span>{label}</span>
        {required && <Text textColor="error-400">*</Text>}
      </Text>
      <div className={styles.content}>
        {options.map((option, key) => (
          <Checkbox
            label={option.label}
            inputProps={{
              name,
              value: option.value,
              checked: checked[key],
              onChange: handleOnChange(key),
            }}
            key={key}
          />
        ))}
      </div>
    </Flex>
  );
}
