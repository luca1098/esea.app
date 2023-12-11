import { z } from 'zod';
import {
  PersonaleRoleSchema,
  PersonaleSalaryLiteralSchema,
} from '@/core/shared/types/personale';
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from '@/kit/Input/FileUploader';

export const PersonaleSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullish(),
  salary: z.number(),
  birthday: z.number(),
  role: PersonaleRoleSchema,
  salaryType: PersonaleSalaryLiteralSchema,
});

export const NuovoPersonaleFormSchema = z.object({
  name: z.string(),
  birthday: z.date().nullish(),
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
  role: PersonaleRoleSchema,
  salary: z.number().nullish(),
  salaryType: PersonaleSalaryLiteralSchema.nullish(),
});
export type PersonaleProps = z.infer<typeof PersonaleSchema>;
export type NuovoPersonaleFormValues = z.infer<typeof NuovoPersonaleFormSchema>;
