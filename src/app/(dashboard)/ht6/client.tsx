'use client';

import { ReactNode } from 'react';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import { InputLikePublicProps } from '@/components/InputLike';
import Text from '@/components/Text';

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
    <Flex as="fieldset" data-full>
      <Text as="legend">{label}</Text>
      <Flex>
        {options.map((option, key) => (
          <Checkbox
            label={option.label}
            inputProps={{ name, value: option.value }}
            key={key}
          />
        ))}
      </Flex>
    </Flex>
  );
}
