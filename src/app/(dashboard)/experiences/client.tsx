'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';
import FileUpload from '@/components/FileUpload';

export function SaveAndContinue() {
  const { pending } = useFormStatus();
  return (
    <Button
      loading={pending && 'Saving...'}
      buttonColor="primary"
      type="submit"
    >
      Save & Continue
    </Button>
  );
}

export interface ResumeUploadProps {
  friendlyResumeFileName?: string;
}
export function ResumeUpload({ friendlyResumeFileName }: ResumeUploadProps) {
  const defaultFile =
    friendlyResumeFileName ? new File([], friendlyResumeFileName) : undefined;

  return (
    <FileUpload
      label="Your resume"
      inputProps={{
        accept: '.pdf',
        required: true,
        defaultValue: defaultFile,
        name: 'resume',
      }}
    />
  );
}
