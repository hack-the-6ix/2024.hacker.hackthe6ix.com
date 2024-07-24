import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { NavLinks, NavLinksProps } from '../client';

async function Links() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  const links: NavLinksProps['items'] =
    profile.status.canAmendTeam ?
      [
        {
          label: 'Team Formation',
          href: '/team',
        },
      ]
    : [];

  if (profile.status.canApply || profile.status.applied) {
    links.push(
      {
        label: 'About You',
        href: '/about',
      },
      {
        label: 'Your Experiences',
        href: '/experiences',
      },
      {
        label: 'At HT6',
        href: '/ht6',
      },
    );
  }

  return <NavLinks items={links} />;
}

export default Links;
