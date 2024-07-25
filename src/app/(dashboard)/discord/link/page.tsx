import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { LoadingState } from '../client';

async function DiscordLinkPage() {
  const { message: discordOAuthUrl } = await fetchHt6<
    Ht6Api.ApiResponse<string>,
    Record<string, string>
  >('/api/action/discordOAuthUrl', {
    method: 'POST',
    body: { redirectUrl: process.env.HOST + '/discord/callback' },
  });

  if (discordOAuthUrl && discordOAuthUrl.startsWith('http')) {
    return redirect(discordOAuthUrl);
  }

  return <LoadingState />;
}

export default DiscordLinkPage;
