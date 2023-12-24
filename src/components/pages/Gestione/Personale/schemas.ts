import { z } from 'zod';
import {
  PersonaleRoleSchema,
  PersonaleSalaryLiteralSchema,
} from '@/core/types/personale';

export const NuovoPersonaleFormSchema = z.object({
  name: z.string(),
  birthday: z.date().nullish(),
  image: z.any(),
  role: PersonaleRoleSchema,
  salary: z.number().nullish(),
  salaryType: PersonaleSalaryLiteralSchema.nullish(),
});
export type NuovoPersonaleFormValues = z.infer<typeof NuovoPersonaleFormSchema>;
