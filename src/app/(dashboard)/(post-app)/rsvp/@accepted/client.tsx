'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { rsvp } from './actions';

export function Decline() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await rsvp(false);
        setLoading(false);
      }}
      buttonType="secondary"
    >
      I can no longer attend
    </Button>
  );
}

export function Accept() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await rsvp(true);
        setLoading(false);
      }}
      buttonColor="primary"
    >
      Accept invitation
    </Button>
  );
}
