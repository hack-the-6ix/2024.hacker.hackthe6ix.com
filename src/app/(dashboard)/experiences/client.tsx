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
