import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Boat } from './Barche';

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('id');
    t.string('titolo');
    t.float('from');
    t.float('to');
    t.string('boatId');
    t.string('clientId');
    t.string('skipperId');
    t.field('boat', { type: Boat });
  },
});

export const GetEvents = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('events', {
      type: Event,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.event.findMany();
      },
    });
  },
});
export const GetBoatEvents = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('boatEvents', {
      type: Event,
      args: {
        boatId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.event.findMany({
          where: { boatId: args.boatId },
        });
      },
    });
  },
});
