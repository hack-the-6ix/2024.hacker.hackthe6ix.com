import { redirect } from 'next/navigation';

interface CallbackPageProps {
  searchParams: {
    state: string; // The params
    session_state: string;
    code: string;
  };
}
const loginURL = new URL('/auth/public/login', process.env.API_HOST);
const callbackURL = new URL('/callback', process.env.HOST);

async function CallbackPage({ ...props }) {
  const test = await fetch(loginURL.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectTo: process.env.HOST,
      callbackURL: callbackURL.href,
    }),
  });
  console.log(await test.json(), props);
  return <div>owo</div>;
}

export default CallbackPage;
