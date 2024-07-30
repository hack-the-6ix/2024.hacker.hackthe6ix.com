import { ReactNode } from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './shared.module.scss';

export interface SectionProps {
  heading: ReactNode;
  description: ReactNode;
  children: ReactNode;
}
export function Section({ heading, description, children }: SectionProps) {
  return (
    <Flex direction="column" gap="big">
      <Flex direction="column">
        <Text
          textColor="secondary-700"
          textType="subtitle-sm"
          textWeight="bold"
          as="h2"
        >
          {heading}
        </Text>
        <Text textWeight="medium" textColor="neutral-700" as="p">
          {description}
        </Text>
      </Flex>
      <div className={styles.sectionBody}>{children}</div>
    </Flex>
  );
}
