'use client';

import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import * as R from 'ramda';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import { InputLikePublicProps } from '@/components/InputLike';
import Text from '@/components/Text';
import styles from './client.module.scss';

export function SubmitApplication() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button
        onClick={() => dialogRef.current?.showModal()}
        buttonColor="primary"
      >
        Submit Application
      </Button>
      <Flex
        className={styles.dialog}
        direction="column"
        align="center"
        ref={dialogRef}
        gap="3x-big"
        as="dialog"
      >
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
          <Button
            onClick={() => dialogRef.current?.close()}
            buttonType="secondary"
          >
            Cancel
          </Button>
          <Button buttonColor="primary" type="submit">
            Submit
          </Button>
        </Flex>
      </Flex>
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

  const handleOnChange = (pos: number) => (e: FormEvent<HTMLDivElement>) => {
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
