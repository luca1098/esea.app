import { objectType } from 'nexus';
import { Event } from './Events';

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.string('email');
    t.string('phone');
    t.field('events', { type: Event });
  },
});
