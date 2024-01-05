import { objectType } from 'nexus';
import { Boat } from './Barche';

export const Slot = objectType({
  name: 'Slot',
  definition(t) {
    t.nonNull.string('id');
    t.float('from');
    t.float('to');
    t.string('boatId');
    t.field('boat', { type: Boat });
  },
});
