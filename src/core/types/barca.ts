import { z } from 'zod';
import { ServiceSchema } from './services';
import { EventSchema } from './event';

export const UnaviableSlotSchema = z.object({
  id: z.string().nullish(),
  from: z.number().nullish(),
  to: z.number().nullish(),
  boatId: z.string().nullish(),
});
export const BoatSchema = z.object({
  name: z.string(),
  image: z.string().nullish(),
  id: z.string(),
  maxPeople: z.number().nullish(),
  services: z.array(ServiceSchema).nullish(),
  events: z.array(EventSchema).nullish(),
  unaviableSlots: z.array(UnaviableSlotSchema).nullish(),
});

export type BoatProps = z.infer<typeof BoatSchema>;
export type UnaviableSlotProps = z.infer<typeof UnaviableSlotSchema>;
export type CalendarBoat = Pick<BoatProps, 'id' | 'image' | 'name'>;
