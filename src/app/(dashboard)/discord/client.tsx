'use client';

import { useEffect } from 'react';
import Text from '@/components/Text';

export function LoadingState() {
  return (
    <Text textType="paragraph-lg">
      Please wait while we connect your account...
    </Text>
  );
}
