import { z } from 'zod';

export const CanaleSchema = z.object({
  label: z.string(),
  id: z.string(),
});

export const CanaliResponseSchema = z.object({
  canali: z.array(CanaleSchema).nullish(),
});

export type CanaleProps = z.infer<typeof CanaleSchema>;
