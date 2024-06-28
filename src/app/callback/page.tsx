'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setSession } from './actions';

interface CallbackPageProps {
  searchParams: {
    state: string; // The params
    session_state: string;
    code: string;
  };
}

function CallbackPage({ searchParams }: CallbackPageProps) {
  const router = useRouter();
  useEffect(() => {
    setSession(searchParams.state, searchParams.code).then((url) => {
      router.push(url);
    });
  }, [searchParams, router]);
  return <div>owo</div>;
}

export default CallbackPage;
