'use server';

import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

type ApplicationPayload = {
  attending: boolean;
  form?: Object;
};

export async function denyRSVP() {
  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    ApplicationPayload
  >('/api/action/rsvp', {
    body: { attending: false },
    method: 'POST',
  });
}

export async function confirmRSVP() {
  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    ApplicationPayload
  >('/api/action/rsvp', {
    body: { attending: true },
    method: 'POST',
  });
}
