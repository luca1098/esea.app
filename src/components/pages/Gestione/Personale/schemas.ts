import { z } from 'zod';
import {
  PersonaleRoleSchema,
  PersonaleSalaryLiteralSchema,
} from '@/core/shared/types/personale';

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
  image: z.any(),
  role: PersonaleRoleSchema,
  salary: z.number().nullish(),
  salaryType: PersonaleSalaryLiteralSchema.nullish(),
});
export type PersonaleProps = z.infer<typeof PersonaleSchema>;
export type NuovoPersonaleFormValues = z.infer<typeof NuovoPersonaleFormSchema>;
