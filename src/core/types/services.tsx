import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  slug: z.string(),
  boatId: z.string(),
});

export type ServiceProps = z.infer<typeof ServiceSchema>;

export type EseaResponse = {
  valido: boolean;
  message?: string;
};
