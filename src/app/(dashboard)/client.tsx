'use client';

import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Link, { LinkProps } from 'next/link';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import cn from 'classnames';
import { format } from 'date-fns/format';
import { ForwardRefExoticComponentWithAs } from 'forward-ref-as';
import Ht6Api from '@/api.d';
import Button, { ButtonProps } from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
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
  const [show, setShow] = useState(false);

  return (
    <>
      <Flex
        className={cn(show && styles.show, styles.navLinks)}
        direction="column"
      >
        {items.map(({ label, href }, idx) => (
          <Button
            className={cn(
              styles.navLinks__item,
              pathname === href && styles['navLinks__item--active'],
            )}
            onClick={() => setShow(false)}
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
        <Logout
          onClick={() => setShow(false)}
          className={styles.navLinks__logout}
        />
      </Flex>
      <Button
        onClick={() => setShow(!show)}
        buttonType="tertiary"
        className={styles.menu}
      >
        <Icon size="md" icon="menu" />
      </Button>
    </>
  );
}

export function Logout({
  className,
  onClick,
  mobile,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  mobile?: boolean;
}) {
  return (
    <Button
      className={cn(className, mobile ? styles.mobile : styles.desktop)}
      onClick={(e) => {
        onClick?.(e);
        logout();
      }}
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
  updateTeamsUntil?: number;
  status?: Ht6Api.HackerProfile['status'];
  onNext?: ReactNode;
}

export function FormPage({
  fields,
  heading,
  status,
  updateTeamsUntil = 0,
  onBack,
  onNext,
  ...props
}: FormPageProps) {
  const date = format(updateTeamsUntil, "MMMM d, y @ K:mma 'EST'");
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

  const readonly = !status?.canApply;

  if (readonly && !status?.applied) {
    return redirect('/closed', RedirectType.replace);
  }

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
      {readonly && (
        <Flex className={styles.submitted} direction="column" gap="sm">
          <Text
            textColor="success-600"
            textWeight="bold"
            textType="subtitle-sm"
            as="p"
          >
            Your application has been submitted.
          </Text>
          <Text
            textColor="success-600"
            textWeight="medium"
            textType="label"
            as="p"
          >
            The HT6 team will review your application soon. Keep an eye on your
            inbox for your application results!
          </Text>
          <Text
            textColor="success-600"
            textWeight="medium"
            textType="label"
            as="p"
          >
            Updates can be made to your teams until {date}. While you
            aren&apos;t able to make any more edits, you can still review your
            submission details below.
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
