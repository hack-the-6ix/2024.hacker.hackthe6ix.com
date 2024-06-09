'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import Button, { ButtonProps } from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './client.module.scss';

export interface NavLinksProps {
  items: {
    label: ReactNode;
    href: LinkProps['href'];
  }[];
}
export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <Flex className={styles.navLinks} direction="column">
      {items.map(({ label, href }, idx) => (
        <Button
          className={cn(
            styles.navLinks__item,
            pathname === href && styles['navLinks__item--active'],
          )}
          buttonColor="primary"
          buttonType="tertiary"
          buttonLevel={600}
          as={Link}
          href={href}
          key={idx}
        >
          <span className={styles.navLinks__label}>{label}</span>
        </Button>
      ))}
    </Flex>
  );
}

export interface FormPageProps extends ComponentPropsWithoutRef<'form'> {
  heading: ReactNode;
  onBack: ButtonProps<'button'>;
  onNext: ButtonProps<'button'>;
}

export function FormPage({ heading, onBack, onNext, ...props }: FormPageProps) {
  return (
    <Flex
      {...props}
      className={cn(styles.form, props.className)}
      direction="column"
      gap="3x-big"
      as="form"
    >
      <Text
        textWeight="bold"
        textType="heading-sm"
        textColor="warning-500"
        as="h1"
      >
        {heading}
      </Text>
      <div className={styles.form__body}>{props.children}</div>
      <Flex direction="column" gap="sm">
        <hr className={styles.form__hr} />
        <Flex align="center" justify="space-between" gap="sm">
          <Button
            {...onBack}
            className={cn(styles.form__back, onBack.className)}
          />
          <Button {...onNext} />
        </Flex>
      </Flex>
    </Flex>
  );
}
