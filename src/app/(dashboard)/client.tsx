'use client';

import {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { ForwardRefExoticComponentWithAs } from 'forward-ref-as';
import Ht6Api from '@/api.d';
import Button, { ButtonProps } from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { logout } from './actions';
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

export function Logout() {
  return (
    <Button
      onClick={() => logout()}
      buttonColor="primary"
      buttonType="secondary"
    >
      Log Out
    </Button>
  );
}

export interface FormPageProps extends ComponentPropsWithoutRef<'form'> {
  heading: ReactNode;
  onBack: ComponentPropsWithoutRef<
    ForwardRefExoticComponentWithAs<'a', ButtonProps>
  >;
  fields?: Ht6Api.HackerApplicationFields[];
  readonly?: boolean;
  onNext?: ReactNode;
}

export function FormPage({
  fields,
  heading,
  readonly,
  onBack,
  onNext,
  ...props
}: FormPageProps) {
  const checkErrors = useCallback(
    (fields: string[] = []) =>
      fields?.some((field) =>
        window.sessionStorage.getItem(`errors::${field}`),
      ) ?? false,
    [],
  );

  const [hasErrors, setHasErrors] = useState(false);
  useEffect(() => {
    const handler = () => {
      setHasErrors(checkErrors(fields));
    };
    window.addEventListener('sessionStorage:update', handler);
    setHasErrors(checkErrors(fields));
    return () => window.removeEventListener('sessionStorage:update', handler);
  }, [checkErrors, fields]);

  return (
    <Flex
      {...props}
      className={cn(styles.form, props.className)}
      direction="column"
      gap="3x-big"
      as="form"
    >
      {hasErrors && (
        <Flex className={styles.error} direction="column" gap="x-sm">
          <Text
            textColor="error-600"
            textWeight="bold"
            textType="subtitle-sm"
            as="p"
          >
            Incomplete application
          </Text>
          <Text
            textColor="error-600"
            textWeight="medium"
            textType="label"
            as="p"
          >
            Please resolve the errors on this page before you submit.
          </Text>
        </Flex>
      )}
      <Text
        textWeight="bold"
        textType="heading-sm"
        textColor="warning-500"
        as="h1"
      >
        {heading}
      </Text>
      <Flex className={styles.form__body} direction="column" gap="3x-big">
        {props.children}
      </Flex>
      {!readonly && (
        <Flex direction="column" gap="sm">
          <hr className={styles.form__hr} />
          <Flex
            className={styles.form__foot}
            align="center"
            justify="space-between"
            gap="sm"
          >
            <Button
              buttonLevel={200}
              buttonColor="neutral"
              buttonType="secondary"
              as={Link}
              {...onBack}
            />
            {typeof onNext === 'string' ?
              <Button buttonColor="primary" type="submit">
                {onNext}
              </Button>
            : onNext}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
