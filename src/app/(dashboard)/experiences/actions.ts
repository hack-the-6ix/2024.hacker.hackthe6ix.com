'use server';

import { redirect } from 'next/navigation';
import { z, ZodFormattedError } from 'zod';
import { fetchHt6, uploadHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { patchApplication } from '../actions';

const schema = z.object({
  school: z.string(),
  program: z.string(),
  levelOfStudy: z.string(),
  graduationYear: z.number().int(),
  hackathonsAttended: z.string(),
  resumeSharePermission: z.boolean().optional(),
  githubLink: z.string(),
  portfolioLink: z.string(),
  linkedinLink: z.string(),
});

export async function submitApplication(formData: FormData) {
  const resume = formData.get('resume') as File;
  const application = schema.deepPartial().parse({
    school: formData.get('school') ?? '',
    program: formData.get('program') ?? '',
    levelOfStudy: formData.get('levelOfStudy') ?? '',
    graduationYear: parseInt(formData.get('graduationYear')?.toString() ?? '0'),
    hackathonsAttended: formData.get('hacakthonsAttended') ?? '',
    resumeSharePermission: formData.get('resumeSharePermission') === 'on',
    githubLink: formData.get('githubLink') ?? '',
    portfolioLink: formData.get('portfolioLink') ?? '',
    linkedinLink: formData.get('linkedinLink') ?? '',
  });

  if (resume.size) {
    await uploadHt6<{ status: 200; message: 'Success' }>(
      '/api/action/updateresume',
      resume,
      {
        fileName: 'resume',
        method: 'PUT',
      },
    );
  }

  await fetchHt6<
    Ht6Api.ApiResponse<{ status: 200; message: 'Success' }>,
    { submit: false; application: Partial<Ht6Api.HackerApplication> }
  >('/api/action/updateapp', {
    method: 'POST',
    body: {
      submit: false,
      application: await patchApplication(application),
    },
  });

  return redirect('/ht6');
}
