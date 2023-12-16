import { z } from 'zod';

export const NuovoEventoFormSchema = z.object({
  service: z.string(),
  from: z.date(),
  to: z.date(),
  clientName: z.string().nullish(),
  clientEmail: z.string().nullish(),
  clientPeople: z.string().nullish(),
  clientPhone: z.string().nullish(),
  skipper: z.string().nullish(),
  note: z.string().nullish(),
});

export type NuovoEventoFormProps = z.infer<typeof NuovoEventoFormSchema>;
