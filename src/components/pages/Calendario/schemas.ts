import { BoatSchema } from '@/core/types/barca';
import { z } from 'zod';

const CalendarioParamentriSchema = z.object({
  boats: z.array(BoatSchema).nullish(),
});

export const CalendarioParamentriResponseSchema = z.object({
  calendarioParametri: CalendarioParamentriSchema.nullish(),
});
