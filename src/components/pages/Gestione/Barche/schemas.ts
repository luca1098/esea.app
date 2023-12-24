import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from '@/kit/Input/FileUploader';
import { z } from 'zod';

export const FormInserisciBarcaSchema = z.object({
  name: z.string(),
  maxPeople: z.string(),
  image: z
    .any()
    .refine(
      (file) => file?.size <= DEFAULT_MAX_FILE_SIZE,
      `La dimenzione massima del file è di 3MB.`,
    )
    .refine(
      (file) => DEFAULT_ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Solamente i formati .jpg, .jpeg, .png and .webp sono supportati.',
    ),
});

export type FormInserisciBarca = z.infer<typeof FormInserisciBarcaSchema>;
