import { EventSchema } from '@/core/types/event';
import { z } from 'zod';

export const CompanyEventsResponseSchema = z.object({
  companyEvents: z.array(EventSchema).nullish(),
});

export const BoatEventsResponseSchema = z.object({
  boatEvents: z.array(EventSchema).nullish(),
});
