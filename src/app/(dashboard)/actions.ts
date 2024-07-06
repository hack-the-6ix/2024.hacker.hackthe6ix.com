'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as R from 'ramda';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import { applicationSchema } from '@/schemas';

export async function logout() {
  await fetchHt6('/auth/public/logout', {
    body: { refreshToken: cookies().get('refreshToken')!.value },
    method: 'POST',
  });

  cookies().delete('refreshToken');
  cookies().delete('token');
  return redirect(process.env.LANDING_HOST ?? '/');
}

// TODO: Maybe add enum validation? TBH if someone breaks it, not on us to validate them
export async function validateApplication(
  payload: Partial<Ht6Api.HackerApplication>,
) {
  const application = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );

  return applicationSchema.safeParseAsync({
    emergencyContact: {},
    resumeFileName: application.message.hackerApplication?.resumeFileName,
    ...payload,
  });
}

export async function patchApplication(
  data: Partial<Ht6Api.HackerApplication>,
  submit = false,
) {
  const application = await fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>(
    '/api/action/profile',
  );

  const updatedApplication = R.omit(
    ['lastUpdated', 'teamCode', 'resumeFileName', 'friendlyResumeFileName'],
    {
      ...(application.message.hackerApplication ?? {}),
      ...data,
      country: 'Canada',
    },
  );

  return R.reject(R.isEmpty, {
    ...updatedApplication,
    // Set it "empty" if its not set
    graduationYear: updatedApplication.graduationYear || ('' as any),
    emergencyContact: R.reject(
      submit ? R.isEmpty : R.F,
      updatedApplication.emergencyContact as any,
    ),
  }) as Partial<Ht6Api.HackerApplication>;
}
