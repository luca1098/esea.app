import { objectType } from 'nexus';
import { Event } from './Events';

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.string('id');
    t.string('name');
    t.list.field('events', { type: Event });
  },
});
