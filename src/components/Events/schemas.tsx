import { Nullish } from '@/core/shared/types/utils';
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

export type AddEventsArgs = {
  serviceSlug: string;
  from: number;
  to: number;
  people: Nullish<number>;
  boatId: string;
  clientId: Nullish<string>;
  skipperId: Nullish<string>;
  note?: Nullish<string>;
};

export type NuovoEventoFormProps = z.infer<typeof NuovoEventoFormSchema>;
