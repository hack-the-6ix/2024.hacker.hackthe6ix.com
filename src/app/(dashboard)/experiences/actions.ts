'use server';

import { redirect } from 'next/navigation';
import { z, ZodFormattedError } from 'zod';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { patchApplication } from '../actions';

const schema = z.object({
  school: z.string(),
  program: z.string(),
  levelOfStudy: z.string(),
  hackathonsAttended: z.string(),
  resumeSharePermission: z.boolean(),
  githubLink: z.string().url().or(z.literal('')),
  portfolioLink: z.string().url().or(z.literal('')),
  linkedinLink: z.string().url().or(z.literal('')),
});

export async function submitApplication(formData: FormData) {
  const validation = schema.safeParse({
    school: formData.get('school') ?? '',
    program: formData.get('program') ?? '',
    levelOfStudy: formData.get('levelOfStudy') ?? '',
    hackathonsAttended: formData.get('hacakthonsAttended') ?? '',
    resumeSharePermission: formData.get('resumeSharePermission') === 'on',
    githubLink: formData.get('githubLink') ?? '',
    portfolioLink: formData.get('portfolioLink') ?? '',
    linkedinLink: formData.get('linkedinLink') ?? '',
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
      application: await patchApplication(validation.data),
    },
  });

  return redirect('/ht6');
}
