import { z } from 'zod';
import { BoatSchema } from './barca';
import { EventSchema } from './event';
import { ClientSchema } from './client';

const CompanyEmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullish(),
});

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullish(),
  employees: z.array(CompanyEmployeeSchema).nullish(),
  events: z.array(EventSchema).nullish(),
  boats: z.array(BoatSchema).nullish(),
  clients: z.array(ClientSchema).nullish(),
});

export type CompanyProps = z.infer<typeof CompanySchema>;

export type PropsWithCompany = {
  company?: CompanyProps;
};
