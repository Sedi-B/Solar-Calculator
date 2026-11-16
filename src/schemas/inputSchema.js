import { z } from 'zod';


export const inputSchema = z.object({
  monthlyBill: z.coerce
    .number()
    .min(1000, 'Enter your average monthly electricity bill (at least R1,000)')
    .max(10000000, 'That looks too high, please check'),
  monthlyKwh: z.coerce.number().min(0, 'Cannot be negative').max(5000000, 'That looks too high'),
  pattern: z.enum(['day5', 'day6', 'two', 'always']),
  roofArea: z.coerce.number().min(0, 'Cannot be negative').max(1000000, 'That looks too high'),
});