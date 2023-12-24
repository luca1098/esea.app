import { z } from 'zod';
import { EventSchema } from './event';

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  events: z.array(EventSchema).nullish(),
});

export type ClientProps = z.infer<typeof ClientSchema>;
