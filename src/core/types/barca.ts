import { z } from 'zod';
import { ServiceSchema } from './services';
import { EventSchema } from './event';

export const BoatSchema = z.object({
  name: z.string(),
  image: z.string().nullish(),
  id: z.string(),
  maxPeople: z.number().nullish(),
  services: z.array(ServiceSchema).nullish(),
  events: z.array(EventSchema).nullish(),
});

export type BoatProps = z.infer<typeof BoatSchema>;

export type CalendarBoat = Pick<BoatProps, 'id' | 'image' | 'name'>;
