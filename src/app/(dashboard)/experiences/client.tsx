'use client';

import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import * as R from 'ramda';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import FileUpload from '@/components/FileUpload';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import { useSessionStorage } from '@/utils';
import { FormPage, FormPageProps } from '../client';
import { submitApplication } from './actions';

const fields = [
  'school',
  'program',
  'levelOfStudy',
  'graduationYear',
  'resumeFileName',
  'resumeSharePermission',
  'githubLink',
  'portfolioLink',
  'linkedinLink',
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

    router.push('/ht6');
  }, [errors, router, setItem]);

  return (
    <FormPage
      {...props}
      heading="Your Experiences"
      fields={fields}
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
        href: '/about',
      }}
      action={formAction}
      onNext={<SaveAndContinue onClick={() => (submitted.current = true)} />}
      noValidate
    />
  );
}

export interface ResumeUploadProps {
  friendlyResumeFileName?: string;
  readOnly?: boolean;
}
export function ResumeUpload({
  friendlyResumeFileName,
  readOnly,
}: ResumeUploadProps) {
  const defaultFile =
    friendlyResumeFileName ? new File([], friendlyResumeFileName) : undefined;

  return (
    <FileUpload
      data-start
      status={{
        type: 'session',
        key: 'resumeFilename',
      }}
      label="Your resume"
      inputProps={{
        accept: '.pdf',
        required: true,
        defaultValue: defaultFile,
        readOnly,
        name: 'resume',
      }}
    />
  );
}
