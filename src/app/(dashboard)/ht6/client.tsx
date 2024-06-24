'use client';

import { ReactNode } from 'react';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import { InputLikePublicProps } from '@/components/InputLike';
import Text from '@/components/Text';
import styles from './client.module.scss';

export interface ChecklistProps extends InputLikePublicProps {
  limit?: number;
  name: string;
  required?: boolean;
  options: {
    label: ReactNode;
    value: string;
  }[];
}
export function Checklist({ label, required, options, name }: ChecklistProps) {
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
            inputProps={{ name, value: option.value }}
            key={key}
          />
        ))}
      </div>
    </Flex>
  );
}
