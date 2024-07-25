import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

async function DiscordLinkPage() {
	const { message: discordOAuthUrl } = await fetchHt6<
		Ht6Api.ApiResponse<string>, Record<string, string>
	>('/api/action/discordOAuthUrl', {
		method: 'POST',
		body: { redirectUrl: process.env.HOST + "/discord/callback" },
	});

	if (discordOAuthUrl && discordOAuthUrl.startsWith("http")) {
		return redirect(discordOAuthUrl);
	}

	return (
		<>
			<p>get better lel</p>
		</>
	)
}

export default DiscordLinkPage;