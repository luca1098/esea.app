import { z } from 'zod';

export type CalendarBoat = {
  id: string;
  name: string;
  image: string;
};

export const BoatSchema = z.object({
  name: z.string(),
  image: z.string(),
  id: z.string(),
});

export type BoatProps = z.infer<typeof BoatSchema>;
