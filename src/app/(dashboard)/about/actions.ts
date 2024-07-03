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
  emergencyContact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    relationship: z.string(),
  }),
});

export async function submitApplication(formData: FormData) {
  const application = schema.deepPartial().parse({
    emailConsent: formData.get('emailConsent') === 'on',
    gender: formData.get('gender') ?? '',
    ethnicity: formData.get('ethnicity') ?? '',
    city: formData.get('city') ?? '',
    province: formData.get('province') ?? '',
    country: 'Canada',
    shirtSize: formData.get('shirtSize') ?? '',
    dietaryRestrictions: formData.get('dietaryRestrictions') ?? '',
    emergencyContact: {
      firstName: formData.get('emergency.firstName') ?? '',
      lastName: formData.get('emergency.lastName') ?? '',
      phoneNumber: formData.get('emergency.phoneNumber') ?? '',
      relationship: formData.get('emergency.relationship') ?? '',
    },
  });

  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    { submit: false; application: Partial<Ht6Api.HackerApplication> }
  >('/api/action/updateapp', {
    method: 'POST',
    body: {
      submit: false,
      application: await patchApplication(application as any),
    },
  });

  return redirect('/experiences');
}
