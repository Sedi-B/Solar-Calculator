import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  company: z.string().trim().min(2, 'Please enter your company name'),
  phone: z.string().trim().regex(/^(\+?27|0)[\d\s-]{8,11}$/, 'Enter a valid South African number'),
  email: z.string().trim().email('Enter a valid email address'),
  consent: z.boolean().refine((v) => v === true, 'Please agree so we can contact you'),
});
