'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import {
  patchApplication,
  validateApplication,
} from '@/app/(dashboard)/actions';

type ApplicationPayload = {
  submit: boolean;
  application: Partial<Ht6Api.HackerApplication>;
};

export async function submitApplication(_: unknown, formData: FormData) {
  const application = await patchApplication({
    creativeResponseEssay: formData.get('creativeResponseEssay') ?? '',
    whyHT6Essay: formData.get('whyHT6Essay') ?? '',
    mlhCOC: formData.get('mlhCOC') === 'on',
    mlhEmail: formData.get('mlhEmail') === 'on',
    mlhData: formData.get('mlhData') === 'on',
  } as Partial<Ht6Api.HackerApplication>);

  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    ApplicationPayload
  >('/api/action/updateapp', {
    body: { submit: false, application },
    method: 'POST',
  });

  revalidatePath('/ht6');

  const validation = await validateApplication(application);

  if (validation.error) {
    return validation.error.issues;
  }

  const res = await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    ApplicationPayload
  >('/api/action/updateapp', {
    body: { submit: true, application },
    method: 'POST',
  });

  if (res.status) {
    revalidatePath('/', 'layout');
    return redirect('/done');
  }
}
