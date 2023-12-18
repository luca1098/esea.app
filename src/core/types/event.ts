import { Nullish } from '@/core/types/utils';
import { z } from 'zod';

export type EventProps = {
  id: string;
  from: number;
  to: number;
  serviceSlug: string;
  people: Nullish<number>;
  boatId: string;
  clientId: Nullish<string>;
  skipperId: Nullish<string>;
  note?: Nullish<string>;
};

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

export type AddEventsArgs = Omit<EventProps, 'id'>;

export type NuovoEventoFormProps = z.infer<typeof NuovoEventoFormSchema>;
