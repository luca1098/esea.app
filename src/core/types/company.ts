import { z } from 'zod';
import { BoatSchema } from './barca';

const CompanyOwnerSchema = z.object({
  id: z.string(),
  name: z.string(),
});
const CompanyEmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullish(),
});

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: CompanyOwnerSchema,
  employees: z.array(CompanyEmployeeSchema),
  boats: z.array(BoatSchema),
});

export type CompanyProps = z.infer<typeof CompanySchema>;
