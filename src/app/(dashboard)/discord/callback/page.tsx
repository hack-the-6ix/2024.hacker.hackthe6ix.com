import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

async function DiscordCallbackPage({
  searchParams,
}: {
  searchParams: { state?: string; code?: string };
}) {
  if (!searchParams.state || !searchParams.code) {
    return <p>ur bad lmao</p>;
  }

  const { status } = await fetchHt6<
    Ht6Api.ApiResponse<string>,
    Record<string, string>
  >('/api/action/associateDiscord', {
    method: 'POST',
    body: {
      state: searchParams.state,
      code: searchParams.code,
    },
  });

  return redirect('https://discord.gg/ZzYZZKyxSs');
}

export default DiscordCallbackPage;
