'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as R from 'ramda';
import { z } from 'zod';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';

const schema = z.object({
  emailConsent: z.boolean().optional(),
  gender: z.string(),
  country: z.literal('Canada'),
  shirtSize: z.string(),
  dietaryRestrictions: z.string().max(256).optional(),
  city: z.string().min(1).max(256),
  province: z.string(),
  school: z.string(),
  program: z.string(),
  levelOfStudy: z.string(),
  graduationYear: z.number().int().min(2023).max(2031),
  hackathonsAttended: z.string(),
  resumeFileName: z.string(),
  resumeSharePermission: z.boolean(),
  githubLink: z.string().url().max(1024).optional(),
  portfolioLink: z.string().url().max(1024).optional(),
  linkedinLink: z.string().url().max(1024).optional(),
  creativeResponseEssay: z
    .string()
    .min(1)
    .max(2056)
    .refine((v) => {
      const words = v.trim().split(' ').filter(Boolean).length;
      return words >= 50 && words <= 200;
    }, 'Essay must be within 50 to 200 words'),
  whyHT6Essay: z
    .string()
    .min(1)
    .max(2056)
    .refine((v) => {
      const words = v.trim().split(' ').filter(Boolean).length;
      return words >= 50 && words <= 200;
    }, 'Essay must be within 50 to 200 words'),
  mlhCOC: z.literal(true),
  mlhEmail: z.boolean().optional(),
  mlhData: z.literal(true),
  emergencyContact: z.object({
    firstName: z.string().min(1).max(256),
    lastName: z.string().min(1).max(256),
    phoneNumber: z
      .string()
      .regex(
        /^\d{3}[\s.-]\d{3}[\s.-]\d{4}$/,
        'Should be in the format of ###-###-####',
      ),
    relationship: z.string(),
  }),
});

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

  return schema.safeParseAsync({
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
      R.isEmpty,
      updatedApplication.emergencyContact as any,
    ),
  }) as Partial<Ht6Api.HackerApplication>;
}
