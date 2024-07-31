'use client';

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import * as R from 'ramda';
import type { Ht6Api } from '@/api.d';
import { FormPage, FormPageProps } from '@/app/(dashboard)/client';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { useSessionStorage } from '@/utils';
import { submitApplication } from './actions';
import styles from './client.module.scss';

const fields = [
  'emailConsent',
  'phoneNumber',
  'age',
  'gender',
  'ethnicity',
  'city',
  'province',
  'shirtSize',
  'dietaryRestrictions',
  'emergencyContact.firstName',
  'emergencyContact.lastName',
  'emergencyContact.phoneNumber',
  'emergencyContact.relationship',
] satisfies Ht6Api.HackerApplicationFields[];

export function SaveAndContinue(props: ComponentPropsWithoutRef<'button'>) {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending && 'Saving...'}
      buttonColor="primary"
      type="submit"
      {...props}
    >
      Save & Continue
    </Button>
  );
}

export function Form(props: Partial<FormPageProps>) {
  const [errors, formAction] = useFormState(submitApplication, {
    _errors: [],
  });
  const { setItem } = useSessionStorage();
  const submitted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!submitted.current) return;
    fields.map((field) => {
      const error = R.path([...field.split('.'), '_errors', 0], errors);
      setItem(`errors::${field}`, error);
    });

    router.push('/experiences');
  }, [errors, router, setItem]);

  return (
    <FormPage
      {...props}
      heading="About You"
      fields={fields}
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
        href: '/team',
      }}
      action={formAction}
      noValidate
      onNext={<SaveAndContinue onClick={() => (submitted.current = true)} />}
    />
  );
}

export function WhyEthnicity() {
  const [show, setShow] = useState(false);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (target.current?.contains(e.target as unknown as Node)) return;
      setShow(false);
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [show]);

  return (
    <div className={styles.why} ref={target}>
      <Text
        onClick={() => setShow(!show)}
        className={styles.trigger}
        textType="label"
        textColor="primary-600"
        as="button"
        type="button"
      >
        <Icon icon="help" />
        <u>Why are we asking this?</u>
      </Text>
      <Text
        textColor="secondary-700"
        textType="label"
        className={cn(show && styles.show, styles.tooltip)}
      >
        This question allows us to gauge our hackathon&apos;s commitment to
        diversity and inclusion where we can equitably work towards a better and
        inclusive hacking community for everyone. We at Hack the 6ix believe
        that diversity delivers a unique array of ideas and is a key ingredient
        for better decision-making among teams.
      </Text>
    </div>
  );
}
