import { z } from 'zod';

export const PaymentMethodsSchema = z.union([
  z.literal('PAYPAL'),
  z.literal('BITCOIN'),
  z.literal('CARD'),
  z.literal('SATISPAY'),
  z.literal('NONE'),
]);

export const CardTypeSchema = z.union([
  z.literal('MASTERCARD'),
  z.literal('CHINA_UNION_PAY'),
  z.literal('AMEX'),
  z.literal('DISCOVER'),
  z.literal('VISA'),
  z.literal('JCB'),
  z.literal('DINERS'),
]);

export type PaymentMethodsType = z.infer<typeof PaymentMethodsSchema>;

export type CardType = z.infer<typeof CardTypeSchema>;

export const PaymentSchema = z.object({
  id: z.string(),
  method: PaymentMethodsSchema,
  cardNumber: z.string().nullish(),
  expireDate: z.string().nullish(),
  secureCod: z.string().nullish(),
  cardHolder: z.string().nullish(),
});

export type PaymentProps = z.infer<typeof PaymentSchema>;
