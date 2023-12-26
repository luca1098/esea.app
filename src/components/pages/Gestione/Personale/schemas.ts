import { z } from 'zod';
import {
  PersonaleRoleSchema,
  PersonaleSalaryLiteralSchema,
  PersonaleSchema,
} from '@/core/types/personale';
import { EseaResponseSchema } from '@/core/types/services';

export const NuovoPersonaleFormSchema = z.object({
  name: z.string(),
  birthday: z.date().nullish(),
  image: z.any().nullish(),
  role: PersonaleRoleSchema,
  salary: z.number().nullish(),
  salaryType: PersonaleSalaryLiteralSchema.nullish(),
});

export const AddPersonaleArgsSchema = z.object({
  role: PersonaleRoleSchema,
  name: z.string(),
  image: z.string().nullish(),
  salary: z.number().nullish(),
  birthday: z.number().nullish(),
  salaryType: PersonaleSalaryLiteralSchema,
  companyId: z.string(),
});

export const AddPersonaleResponseSchema = z.object({
  addPersonale: EseaResponseSchema,
});
export const PersonaleResponseSchema = z.object({
  companyPersonale: z.array(PersonaleSchema).nullish(),
});

export type NuovoPersonaleFormValues = z.infer<typeof NuovoPersonaleFormSchema>;
export type AddPersonaleArgsProps = z.infer<typeof AddPersonaleArgsSchema>;
