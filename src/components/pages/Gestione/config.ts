import { navigation } from '@/core/config/navigation';
import {
  PersonaleRoleProps,
  PersonaleSalaryProps,
} from '@/core/types/personale';
import { ActionButtonProps } from '@/kit/Button/ActionButton';
import { createStandaloneToast } from '@chakra-ui/react';
import { keyBy } from 'lodash';

export const userPannelActions: ActionButtonProps[] = [
  { label: 'Overview', href: navigation.private.gestione.index },
  { label: 'Barche', href: navigation.private.gestione.barche.index },
  { label: 'Personale', href: navigation.private.gestione.personale.index },
];

export const salaryConfig: PersonaleSalaryProps[] = [
  {
    label: 'Ora',
    key: 'HOUR',
  },
  {
    label: 'Giorno',
    key: 'DAY',
  },
  {
    label: 'Mese',
    key: 'MONTH',
  },
];

export const salaryMapper = keyBy(salaryConfig, (p) => String(p.key));

export const personaleRoleConfig: PersonaleRoleProps[] = [
  {
    id: 'role-coll-1',
    color: 'green',
    label: 'Skipper',
    key: 'SKIPPER',
  },
  {
    id: 'role-coll-3',
    color: 'orange',
    label: 'Assistente',
    key: 'ASSISTENT',
  },
  {
    id: 'role-coll-2',
    color: 'purple',
    label: 'Collabolatore',
    key: 'COLLABORATOR',
  },
  {
    id: 'role-coll-5',
    color: 'red',
    label: 'Co Fondatore',
    key: 'COFOUNDER',
  },
  {
    id: 'role-coll-6',
    color: 'yellow',
    label: 'Fornitore',
    key: 'FORNITORE',
  },
  {
    id: 'role-coll-7',
    color: 'gray',
    label: 'Altro',
    key: 'ALTRO',
  },
];

export const personaleRoleMapper = keyBy(personaleRoleConfig, (p) =>
  String(p.key),
);
