import { z } from 'zod';
import { CanaleSchema } from './canale';

export const StatusTypeSchema = z.union([
  z.literal('PAYED'),
  z.literal('ADVANCE_PAYMENT'),
  z.literal('TO_PAY'),
  z.literal('NONE'),
]);

const EventBoatSchema = z.object({
  name: z.string(),
  image: z.string().nullish(),
  id: z.string(),
});
const SkipperBoatSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullish(),
});

const ServiceBoatSchema = z.object({
  id: z.string(),
  label: z.string().nullish(),
});

const ClientBoatSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
});

export const EventSchema = z.object({
  id: z.string(),
  from: z.number(),
  to: z.number(),
  people: z.number().nullish(),
  note: z.string().nullish(),
  serviceId: z.string().nullish(),
  boatId: z.string().nullish(),
  clientId: z.string().nullish(),
  skipperId: z.string().nullish(),
  canaleId: z.string().nullish(),
  companyId: z.string().nullish(),
  canale: CanaleSchema.nullish(),
  skipper: SkipperBoatSchema.nullish(),
  boat: EventBoatSchema.nullish(),
  client: ClientBoatSchema.nullish(),
  service: ServiceBoatSchema.nullish(),
  status: StatusTypeSchema.nullish(),
  amount: z.number().nullish(),
  statusDetails: z.string().nullish(),
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
  status: StatusTypeSchema,
  amount: z.number().nullish(),
  statusDetails: z.string().nullish(),
});

export const AddEventsArgsSchema = z.object({
  from: z.number(),
  to: z.number(),
  serviceId: z.string(),
  people: z.number().nullish(),
  boatId: z.string(),
  clientId: z.string().nullish(),
  skipperId: z.string().nullish(),
  note: z.string().nullish(),
  canaleId: z.string().nullish(),
  companyId: z.string().nullish(),
  status: StatusTypeSchema,
  amount: z.number().nullish(),
  statusDetails: z.string().nullish(),
});

export type AddEventsArgs = z.infer<typeof AddEventsArgsSchema>;

export type EventProps = z.infer<typeof EventSchema>;
export type NuovoEventoFormProps = z.infer<typeof NuovoEventoFormSchema>;
export type StatusTypeProps = z.infer<typeof StatusTypeSchema>;
