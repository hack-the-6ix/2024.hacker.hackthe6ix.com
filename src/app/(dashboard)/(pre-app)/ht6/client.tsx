'use client';

import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import * as R from 'ramda';
import { ZodIssue } from 'zod';
import { FormPage, FormPageProps } from '@/app/(dashboard)/client';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import { InputLikePublicProps } from '@/components/InputLike';
import Text from '@/components/Text';
import { useSessionStorage } from '@/utils';
import { submitApplication } from './actions';
import styles from './client.module.scss';

export function Form(props: Partial<FormPageProps>) {
  const [errors, formAction] = useFormState(submitApplication, null);

  return (
    <FormPage
      {...props}
      heading="At HT6"
      fields={[
        'creativeResponseEssay',
        'whyHT6Essay',
        'mlhCOC',
        'mlhData',
        'mlhEmail',
      ]}
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
        href: '/experiences',
      }}
      action={formAction}
      noValidate
      onNext={<SubmitApplication errors={errors} />}
    />
  );
}

export function SubmitApplication({
  errors,
}: {
  errors: ZodIssue[] | undefined | null;
}) {
  const [hasErrors, setHasErrors] = useState<boolean | null>(null);
  const { setItem, clear } = useSessionStorage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!errors) return;

    clear();
    errors.forEach((error) => {
      setItem(`errors::${error.path.join('.')}`, error.message);
    });
    setHasErrors(!!errors?.length);
  }, [setItem, clear, errors]);

  const close = () => {
    dialogRef.current?.close();
    setHasErrors(null);
  };

  return (
    <>
      <Button
        onClick={() => dialogRef.current?.showModal()}
        buttonColor="primary"
      >
        Submit Application
      </Button>
      <dialog className={styles.dialog} ref={dialogRef}>
        {hasErrors ?
          <Flex direction="column" align="center" gap="3x-big">
            <Text
              textWeight="bold"
              textColor="error-600"
              textType="subtitle-lg"
              textAlign="center"
              as="h2"
            >
              Incomplete application
            </Text>
            <Text
              textAlign="center"
              textColor="secondary-700"
              textType="paragraph-lg"
              as="p"
            >
              Please resolve the following pages before you submit.
            </Text>
            <Flex
              className={styles.dialogFooter}
              justify="center"
              align="center"
              gap="x-sm"
            >
              <Button onClick={close} buttonColor="primary">
                Go back to application
              </Button>
            </Flex>
          </Flex>
        : <Flex direction="column" align="center" gap="3x-big">
            <Flex direction="column" align="center" gap="m">
              <Text
                textWeight="bold"
                textColor="warning-500"
                textType="subtitle-lg"
                textAlign="center"
                as="h2"
              >
                Submit application?
              </Text>
              <Text
                textAlign="center"
                textColor="secondary-700"
                textType="paragraph-lg"
                as="p"
              >
                Once you submit this application, you{' '}
                <Text textColor="error-600" textWeight="bold">
                  cannot make
                </Text>{' '}
                any changes.
              </Text>
              <Text
                textAlign="center"
                textColor="secondary-700"
                textType="paragraph-lg"
                as="p"
              >
                Please review your answers to ensure they are accurate.
              </Text>
            </Flex>
            <Flex
              className={styles.dialogFooter}
              justify="center"
              align="center"
              gap="x-sm"
            >
              <Button onClick={close} buttonType="secondary">
                Cancel
              </Button>
              <Button
                loading={pending && 'Submitting...'}
                buttonColor="primary"
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        }
      </dialog>
    </>
  );
}

export interface ChecklistProps extends InputLikePublicProps {
  limit?: number;
  name: string;
  required?: boolean;
  initialValue?: string[];
  options: {
    label: ReactNode;
    value: string;
  }[];
}
export function Checklist({
  label,
  required,
  options,
  initialValue = [],
  name,
  limit = 3,
}: ChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(
    options.map(R.propSatisfies(R.includes(R.__, initialValue), 'value')),
  );

  const handleOnChange = (pos: number) => () => {
    setChecked((oldChecked) => {
      const isUnderLimit = R.count(Boolean, oldChecked) < limit;
      return R.assoc(pos, !oldChecked[pos] && isUnderLimit, oldChecked);
    });
  };

  useEffect(() => {
    setChecked(() =>
      options.map(R.propSatisfies(R.includes(R.__, initialValue), 'value')),
    );
  }, [options, initialValue]);

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
