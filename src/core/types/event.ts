import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string(),
  from: z.number(),
  to: z.number(),
  serviceSlug: z.string(),
  people: z.number().nullish(),
  boatId: z.string(),
  clientId: z.string().nullish(),
  skipperId: z.string().nullish(),
  note: z.string().nullish(),
  titolo: z.string().nullish(),
  canaleId: z.string().nullish(),
});

export const NuovoEventoFormSchema = z.object({
  service: z.string(),
  canale: z.string().nullish(),
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

export type EventProps = z.infer<typeof EventSchema>;
export type NuovoEventoFormProps = z.infer<typeof NuovoEventoFormSchema>;
