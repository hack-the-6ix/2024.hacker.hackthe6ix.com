import { z } from 'zod';

export const emergencyContactSchema = z.object({
  firstName: z.string().min(1, 'This field is required').max(256),
  lastName: z.string().min(1, 'This field is required').max(256),
  phoneNumber: z
    .string()
    .min(1, 'This field is required')
    .regex(
      /^\d{3}[\s.-]\d{3}[\s.-]\d{4}$/,
      'Should be in the format of ###-###-####',
    ),
  relationship: z.string().min(1, 'This field is required'),
});

export const aboutSchema = z.object({
  emailConsent: z.boolean().optional(),
  gender: z.string().min(1, 'This field is required'),
  country: z.literal('Canada'),
  shirtSize: z.string().min(1, 'This field is required'),
  dietaryRestrictions: z.string().max(256).optional(),
  city: z.string().min(1).max(256).min(1, 'This field is required'),
  province: z.string().min(1, 'This field is required'),
  emergencyContact: emergencyContactSchema,
});

export const experiencesSchema = z.object({
  school: z.string().min(1, 'This field is required'),
  program: z.string().min(1, 'This field is required'),
  levelOfStudy: z.string().min(1, 'This field is required'),
  graduationYear: z
    .number()
    .int('This field is required')
    .min(2023, 'Please provide a year within 2023 - 2031')
    .max(2031, 'Please provide a year within 2023 - 2031'),
  hackathonsAttended: z.string().min(1, 'This field is required'),
  resumeFileName: z.string().min(1, 'This field is required'),
  resumeSharePermission: z.boolean(),
  githubLink: z.union([
    z.literal(''),
    z.string().trim().max(1024).url('Please provide a valid URL'),
  ]),
  portfolioLink: z.union([
    z.literal(''),
    z.string().trim().max(1024).url('Please provide a valid URL'),
  ]),
  linkedinLink: z.union([
    z.literal(''),
    z.string().trim().max(1024).url('Please provide a valid URL'),
  ]),
});

export const ht6Schema = z.object({
  creativeResponseEssay: z
    .string()
    .min(1, 'This field is required')
    .max(2056)
    .refine((v) => {
      const words = v.trim().split(' ').filter(Boolean).length;
      return words >= 50 && words <= 200;
    }, 'Essay must be within 50 to 200 words'),
  whyHT6Essay: z
    .string()
    .min(1, 'This field is required')
    .max(2056)
    .refine((v) => {
      const words = v.trim().split(' ').filter(Boolean).length;
      return words >= 50 && words <= 200;
    }, 'Essay must be within 50 to 200 words'),
  mlhCOC: z.literal(true),
  mlhEmail: z.boolean().optional(),
  mlhData: z.literal(true),
});

export const applicationSchema = z
  .object({})
  .merge(aboutSchema)
  .merge(experiencesSchema)
  .merge(ht6Schema);
