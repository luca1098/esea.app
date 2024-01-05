import { UnaviableSlotSchema } from '@/core/types/barca';
import { z } from 'zod';

const ServiceBoatSchema = z.object({
  id: z.string().nullish(),
  label: z.string().min(1),
  durations: z.array(
    z.object({
      label: z.string().min(1),
      price: z.number().nullish(),
    }),
  ),
});

export const FormInserisciBarcaSchema = z.object({
  name: z.string(),
  maxPeople: z.string(),
  image: z.any(),
  services: z.array(ServiceBoatSchema),
  unavailableSlots: z.array(UnaviableSlotSchema).nullish(),
});

export type FormInserisciBarca = z.infer<typeof FormInserisciBarcaSchema>;
