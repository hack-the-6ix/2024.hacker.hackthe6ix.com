'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import cn from 'classnames';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './client.module.scss';

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
