import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Boat } from './Barche';
import { getErrorReturn } from '@/lib/utils';

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

export const GetUnaviableSlots = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('unaviableSlot', {
      type: Slot,
      args: {
        boatId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        try {
          const data = ctx.prisma.slot.findMany({
            where: { boatId: args.boatId },
          });
          //useResolver
          return data;
        } catch (e: unknown) {
          return getErrorReturn(e);
        }
      },
    });
  },
});
