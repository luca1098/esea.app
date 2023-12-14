import { z } from 'zod';

export type CalendarBoat = {
  name: string;
  image: string;
  events?: any; // todo
};

export const BoatSchema = z.object({
  name: z.string(),
  image: z.string(),
  id: z.string(),
});

export type BoatProps = z.infer<typeof BoatSchema>;
