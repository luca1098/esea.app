import { enumType, objectType } from 'nexus';
import { Event } from './Events';

export const Personale = objectType({
  name: 'Personale',
  definition(t) {
    t.nonNull.string('id');
    t.field('role', { type: PeronaleRole });
    t.string('name');
    t.string('image');
    t.float('salary');
    t.float('birtday');
    t.field('salaryType', { type: SalaryType });
    t.field('events', { type: Event });
  },
});

export const PeronaleRole = enumType({
  name: 'PeronaleRole',
  members: {
    SKIPPER: 'SKIPPER',
    ASSISTENT: 'ASSISTENT',
    COLLABORATOR: 'COLLABORATOR',
    COFOUNDER: 'COFOUNDER',
    FORNITORE: 'FORNITORE',
    ALTRO: 'ALTRO',
  },
});

export const SalaryType = enumType({
  name: 'SalaryType',
  members: {
    HOUR: 'HOUR',
    DAY: 'DAY',
    MONTH: 'MONTH',
  },
});
