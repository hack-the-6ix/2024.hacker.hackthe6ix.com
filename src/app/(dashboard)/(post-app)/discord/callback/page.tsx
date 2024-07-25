import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

async function DiscordCallbackPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (
    !searchParams.state ||
    !searchParams.code ||
    Array.isArray(searchParams.state) ||
    Array.isArray(searchParams.code)
  ) {
    return (
      <>
        <p>ur bad lmao</p>
      </>
    );
  }

  const { message, status } = await fetchHt6<
    Ht6Api.ApiResponse<string>,
    Record<string, string>
  >('/api/action/associateDiscord', {
    method: 'POST',
    body: {
      state: searchParams.state,
      code: searchParams.code,
    },
  });

  if (status === 200) {
    return (
      <>
        <p>success</p>
      </>
    );
  }

  return (
    <>
      <p>get better lel</p>
    </>
  );
}

export default DiscordCallbackPage;
