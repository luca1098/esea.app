import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  key: z.string(),
});

export type ServiceProps = z.infer<typeof ServiceSchema>;
