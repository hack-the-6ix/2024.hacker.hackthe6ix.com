import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { Page } from '@/app/(dashboard)/rsvp/shared';
import Text from '@/components/Text';

async function DiscordCallbackPage({
  searchParams,
}: {
  searchParams: { state?: string; code?: string };
}) {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  if (
    !searchParams.state ||
    !searchParams.code ||
    Array.isArray(searchParams.state) ||
    Array.isArray(searchParams.code)
  ) {
    return (
      <Page
        name={profile.firstName}
        title={<>Something went wrong...</>}
        welcome
      >
        <Text textAlign="center" as="p">
          An error occured while trying to associate your Discord account.
          Please try again.
        </Text>
      </Page>
    );
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

  if (status === 200) {
    redirect('https://discord.gg/ZzYZZKyxSs');
  }

  return (
    <Page name={profile.firstName} title={<>Something went wrong...</>} welcome>
      <Text textAlign="center" as="p">
        An error occured while trying to associate your Discord account. Please
        try again.
      </Text>
    </Page>
  );
}

export default DiscordCallbackPage;
