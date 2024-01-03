import { z } from 'zod';

const ServiceBoatSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number().nullish(),
});

export const FormInserisciBarcaSchema = z.object({
  name: z.string(),
  maxPeople: z.string(),
  image: z.any(),
  services: z.array(ServiceBoatSchema),
});

export type FormInserisciBarca = z.infer<typeof FormInserisciBarcaSchema>;
