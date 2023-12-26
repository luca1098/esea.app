import { ThemingProps } from '@chakra-ui/react';
import { z } from 'zod';

export const PersonaleRoleSchema = z.union([
  z.literal('SKIPPER'),
  z.literal('ASSISTENT'),
  z.literal('COLLABORATOR'),
  z.literal('COFOUNDER'),
  z.literal('FORNITORE'),
  z.literal('ALTRO'),
]);

export const PersonaleSalaryLiteralSchema = z.union([
  z.literal('HOUR'),
  z.literal('DAY'),
  z.literal('MONTH'),
]);

export const PersonaleSchema = z.object({
  id: z.string(),
  name: z.string(),
  companyId: z.string().nullish(),
  image: z.string().nullish(),
  salary: z.number().nullish(),
  birthday: z.number().nullish(),
  role: PersonaleRoleSchema,
  salaryType: PersonaleSalaryLiteralSchema,
});

type PersonaleRoleLiteralProps = z.infer<typeof PersonaleRoleSchema>;

export type PersonaleSalaryType = z.infer<typeof PersonaleSalaryLiteralSchema>;

export type PersonaleRoleProps = {
  color: ThemingProps['colorScheme'];
  label: string;
  id: string;
  key: PersonaleRoleLiteralProps;
};

export type PersonaleSalaryProps = {
  label: string;
  key: PersonaleSalaryType;
};

export type PersonaleRoleMapperProps = Record<
  PersonaleRoleLiteralProps,
  PersonaleRoleProps
>;

export type PersonaleProps = z.infer<typeof PersonaleSchema>;
