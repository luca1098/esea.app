import { z } from 'zod';

export const FormInserisciBarcaSchema = z.object({
  name: z.string(),
  maxPeople: z.string(),
});

export type FormInserisciBarca = z.infer<typeof FormInserisciBarcaSchema>;
