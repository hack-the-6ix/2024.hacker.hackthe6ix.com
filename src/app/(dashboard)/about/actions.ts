'use server';

import { revalidatePath } from 'next/cache';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { aboutSchema } from '@/schemas';
import { patchApplication } from '../actions';

export async function submitApplication(_: unknown, formData: FormData) {
  const payload = {
    emailConsent: formData.get('emailConsent') === 'on',
    phoneNumber: formData.get('phoneNumber') ?? '',
    age: formData.get('age')?.toString() ?? '0',
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
  };

  const application = aboutSchema.safeParse(payload);
  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    { submit: false; application: Partial<Ht6Api.HackerApplication> }
  >('/api/action/updateapp', {
    method: 'POST',
    body: {
      submit: false,
      application: await patchApplication(
        payload as Partial<Ht6Api.HackerApplication>,
      ),
    },
  });

  revalidatePath('/about');
  return application.error?.format() ?? { _errors: [] };
}
