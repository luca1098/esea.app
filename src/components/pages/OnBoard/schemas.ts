import { z } from 'zod';

export const InfoPersonaliFormSchema = z.object({
  image: z.any().nullish(),
  phone: z.string(),
  codFisc: z.string(),
  dataNascita: z.date(),
});

export const AddInfoPersonaliArgsSchema = z.object({
  image: z.string().nullish(),
  phone: z.string().nullish(),
  codFisc: z.string().max(16).nullish(),
  dataNascita: z.date().nullish(),
  email: z.string(),
});

export const InfoAziendaFormSchema = z.object({
  name: z.string(),
  logo: z.any().nullish(),
});

export const InfoAziendaArgsSchema = z.object({
  name: z.string(),
  logo: z.any().nullish(),
});

export type InfoPersonaliFormProps = z.infer<typeof InfoPersonaliFormSchema>;
export type InfoAziendaFormProps = z.infer<typeof InfoAziendaFormSchema>;
export type AddInfoPersonaliArgsProps = z.infer<
  typeof AddInfoPersonaliArgsSchema
>;
export type InfoAziendaArgsProps = z.infer<typeof InfoAziendaArgsSchema>;
