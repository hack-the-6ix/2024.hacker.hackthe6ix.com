import { fetchHt6 } from '@/api';
import type { Ht6Api } from '@/api.d';
import { NavLinks, NavLinksProps } from '../client';

async function Links() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  let links: NavLinksProps['items'] =
    profile.status.canAmendTeam && !profile.status.canRSVP ?
      [
        {
          label: 'Team Formation',
          href: '/team',
        },
      ]
    : [];

  if (
    profile.status.applied &&
    !(profile.status.canRSVP && profile.status.accepted)
  ) {
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

  if (profile.status.canRSVP) {
    links.push({
      label: 'RSVP Information',
      href: '/rsvp',
    });
  } else if (profile.status.declined || profile.status.rejected) {
    links = [
      {
        label: 'RSVP Information',
        href: '/rsvp',
      },
    ];
  }

  if (profile.status.confirmed) {
    links.push({
      label: 'Schedule',
      href: '/schedule',
    });
  }

  return <NavLinks items={links} />;
}

export default Links;
