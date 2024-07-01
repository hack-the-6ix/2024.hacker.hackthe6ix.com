'use server';

import { redirect } from 'next/navigation';
import { z, ZodFormattedError } from 'zod';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { patchApplication } from '../actions';

const schema = z.object({
  requestedWorkshops: z.string().array().max(3),
  projectEssay: z.string(),
  whyHT6Essay: z.string(),
  mlhCOC: z.boolean(),
  mlhEmail: z.boolean(),
  mlhData: z.boolean(),
});

export async function submitApplication(formData: FormData) {
  const validation = schema.safeParse({
    requestedWorkshops: formData.getAll('requestedWorkshops') ?? [],
    projectEssay: formData.get('projectEssay') ?? '',
    whyHT6Essay: formData.get('whyHT6Essay') ?? '',
    mlhCOC: formData.get('mlhCOC') === 'on',
    mlhEmail: formData.get('mlhEmail') === 'on',
    mlhData: formData.get('mlhData') === 'on',
  });

  if (validation.error) {
    return {
      status: 300,
      message: validation.error.format(),
    } as Ht6Api.ApiResponse<ZodFormattedError<typeof schema>>;
  }

  const res = await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    { submit: false; application: Partial<Ht6Api.HackerApplication> }
  >('/api/action/updateapp', {
    method: 'POST',
    body: {
      submit: false,
      application: await patchApplication({
        ...validation.data,
        requestedWorkshops: validation.data.requestedWorkshops.join(', '),
      }),
    },
  });

  console.log(res);

  // return redirect('/done');
}
