import { z } from 'zod';
import { ServiceSchema } from './services';
import { EventSchema } from './event';

export type CalendarBoat = {
  id: string;
  name: string;
  image: string;
};

export const BoatSchema = z.object({
  name: z.string(),
  image: z.string(),
  id: z.string(),
  maxPeople: z.number(),
  services: z.array(ServiceSchema).nullish(),
  events: z.array(EventSchema).nullish(),
});

export type BoatProps = z.infer<typeof BoatSchema>;
