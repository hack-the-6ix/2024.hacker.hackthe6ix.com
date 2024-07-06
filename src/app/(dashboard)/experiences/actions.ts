'use server';

import { revalidatePath } from 'next/cache';
import { fetchHt6, uploadHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { experiencesSchema } from '@/schemas';
import { patchApplication } from '../actions';

export async function submitApplication(_: unknown, formData: FormData) {
  const resume = formData.get('resume') as File;
  const payload = {
    school: formData.get('school') ?? '',
    program: formData.get('program') ?? '',
    levelOfStudy: formData.get('levelOfStudy') ?? '',
    graduationYear: parseInt(formData.get('graduationYear')?.toString() ?? '0'),
    hackathonsAttended: formData.get('hacakthonsAttended') ?? '',
    resumeSharePermission: formData.get('resumeSharePermission') === 'on',
    resumeFileName: 'owo',
    githubLink: formData.get('githubLink') ?? '',
    portfolioLink: formData.get('portfolioLink') ?? '',
    linkedinLink: formData.get('linkedinLink') ?? '',
  };
  const application = experiencesSchema.safeParse(payload);

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
      application: await patchApplication(
        payload as Partial<Ht6Api.HackerApplication>,
      ),
    },
  });

  revalidatePath('/experiences');
  return application.error?.format() ?? { _errors: [] };
}
