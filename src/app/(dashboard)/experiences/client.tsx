'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';

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
