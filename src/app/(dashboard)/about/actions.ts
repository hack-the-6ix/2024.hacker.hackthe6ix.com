'use server';

import { redirect } from 'next/navigation';
import z, { ZodFormattedError } from 'zod';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { patchApplication } from '../actions';

const schema = z.object({
  emailConsent: z.boolean(),
  gender: z.string(),
  ethnicity: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  shirtSize: z.string(),
  dietaryRestrictions: z.string().optional(),
  healthWarnings: z.string().optional(),
  emergencyContact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    relationship: z.string(),
  }),
});

export async function submitApplication(formData: FormData) {
  const res = schema.safeParse({
    emailConsent: formData.get('emailConsent') === 'on',
    gender: formData.get('gender') ?? '',
    ethnicity: formData.get('ethnicity') ?? '',
    city: formData.get('city') ?? '',
    province: formData.get('province') ?? '',
    country: 'Canada',
    shirtSize: formData.get('shirtSize') ?? '',
    dietaryRestrictions: formData.get('dietaryRestrictions') ?? '',
    healthWarnings: formData.get('healthWarnings') ?? '',
    emergencyContact: {
      firstName: formData.get('emergencyContact.firstName') ?? '',
      lastName: formData.get('emergencyContact.lastName') ?? '',
      phoneNumber: formData.get('emergencyContact.phoneNumber') ?? '',
      relationship: formData.get('emergencyContact.relationship') ?? '',
    },
  });

  if (!res.success) {
    return {
      status: 400,
      message: res.error.format(),
    } satisfies Ht6Api.ApiResponse<ZodFormattedError<typeof schema>>;
  }

  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    { submit: false; application: Partial<Ht6Api.HackerApplication> }
  >('/api/action/updateapp', {
    method: 'POST',
    body: {
      submit: false,
      application: await patchApplication(res.data),
    },
  });

  return redirect('/experiences');
}
