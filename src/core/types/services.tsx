import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  boatId: z.string().nullish(),
  price: z.number().nullish(),
});

export type ServiceProps = z.infer<typeof ServiceSchema>;

export const EseaResponseSchema = z.object({
  valido: z.boolean(),
  message: z.string().nullable(),
});

export type EseaResponse = z.infer<typeof EseaResponseSchema>;
