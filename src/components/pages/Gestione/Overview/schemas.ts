import { PaymentMethodsSchema } from '@/core/types/payments';
import { z } from 'zod';

export const AccreditoStatusSchema = z.union([
  z.literal('PENDING'),
  z.literal('ERROR'),
  z.literal('SUCCESS'),
]);

const AccreditoSchema = z.object({
  id: z.string(),
  paymentDate: z.number(),
  amount: z.number(),
  method: PaymentMethodsSchema,
  status: AccreditoStatusSchema,
});
const AccreditoListSchema = z.array(AccreditoSchema).nullish();

export type AccreditoProps = z.infer<typeof AccreditoSchema>;
export type AccreditoListProps = z.infer<typeof AccreditoListSchema>;
export type AccreditoStatusTypes = z.infer<typeof AccreditoStatusSchema>;
