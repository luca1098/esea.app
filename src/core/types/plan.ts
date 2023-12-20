import { z } from 'zod';

export const PlanTypeSchema = z.union([
  z.literal('BASE'),
  z.literal('SILVER'),
  z.literal('VIP'),
]);

export const PlanSchema = z.object({
  id: z.string(),
  plan: PlanTypeSchema,
  renewalDate: z.number(),
  lastPaymentDate: z.number(),
  amount: z.number(),
});

export type PlanType = z.infer<typeof PlanTypeSchema>;
export type PlanProps = z.infer<typeof PlanSchema>;
