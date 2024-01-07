import { z } from 'zod';

const DurationSchema = z.object({
  id: z.string().nullish(),
  label: z.string(),
  price: z.number(),
});

export const ServiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  boatId: z.string().nullish(),
  durations: z.array(DurationSchema).nullish(),
});

export type ServiceProps = z.infer<typeof ServiceSchema>;

export const EseaResponseSchema = z.object({
  valido: z.boolean(),
  message: z.string().nullable(),
});

export type EseaResponse = z.infer<typeof EseaResponseSchema>;
