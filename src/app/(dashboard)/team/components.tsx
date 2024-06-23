import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Button, { ButtonProps } from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './components.module.scss';

export interface TeamLayoutProps extends ComponentPropsWithoutRef<'div'> {
  label: ReactNode;
  description?: ReactNode;
  leftAction?: ButtonProps<'button'>;
  rightAction?: ButtonProps<'a'>;
}

export function TeamLayout({
  label,
  description,
  rightAction,
  leftAction,
  children,
  ...props
}: TeamLayoutProps) {
  return (
    <Flex
      {...props}
      className={cn(styles.container, props.className)}
      direction="column"
      align="stretch"
      justify="center"
      gap="3x-big"
    >
      <Flex
        className={styles.content}
        direction="column"
        align="stretch"
        gap="m"
      >
        <Text
          textColor="secondary-700"
          textAlign="center"
          textType="display"
          as="h1"
        >
          {label}
        </Text>
        {description && (
          <Text
            textColor="secondary-700"
            textType="paragraph-lg"
            textWeight="medium"
            textAlign="center"
            as="p"
          >
            {description}
          </Text>
        )}
        {children}
      </Flex>
      <Flex
        justify={leftAction ? 'space-between' : 'flex-end'}
        className={styles.footer}
        align="center"
      >
        {leftAction && <Button {...leftAction} />}
        <Button {...rightAction} as={Link} href="/about">
          {rightAction?.children ?? 'My application'}
        </Button>
      </Flex>
    </Flex>
  );
}
