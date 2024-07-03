'use server';

import { redirect } from 'next/navigation';
import { z, ZodIssue } from 'zod';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { patchApplication, validateApplication } from '../actions';

type ApplicationPayload = {
  submit: boolean;
  application: Partial<Ht6Api.HackerApplication>;
};

const schema = z.object({
  creativeResponseEssay: z.string(),
  whyHT6Essay: z.string(),
  mlhCOC: z.boolean(),
  mlhEmail: z.boolean().optional(),
  mlhData: z.boolean(),
});

export async function submitApplication(
  _: ZodIssue[] | null | undefined,
  formData: FormData,
) {
  const application = await patchApplication(
    schema.parse({
      creativeResponseEssay: formData.get('creativeResponseEssay') ?? '',
      whyHT6Essay: formData.get('whyHT6Essay') ?? '',
      mlhCOC: formData.get('mlhCOC') === 'on',
      mlhEmail: formData.get('mlhEmail') === 'on',
      mlhData: formData.get('mlhData') === 'on',
    }),
  );

  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    ApplicationPayload
  >('/api/action/updateapp', {
    body: { submit: false, application },
    method: 'POST',
  });

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
    return redirect('/done');
  }
}
