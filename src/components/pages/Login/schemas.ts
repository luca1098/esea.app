import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export const SignUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
});

export type SignInFormProps = z.infer<typeof SignInFormSchema>;
export type SignUpFormProps = z.infer<typeof SignUpFormSchema>;
