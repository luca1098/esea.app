import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Boat } from './Barche';
import { getErrorReturn } from '@/lib/utils';

const Duration = objectType({
  name: 'Duration',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('label');
    t.float('price');
  },
});

export const Service = objectType({
  name: 'Service',
  definition(t) {
    t.string('id');
    t.string('label');
    t.list.field('durations', { type: Duration });
    t.field('boat', { type: Boat });
  },
});

export const GetServices = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('services', {
      type: Service,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.service.findMany();
      },
    });
  },
});
export const GetBoatServices = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('boatServices', {
      type: Service,
      args: {
        boatId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        try {
          const data = ctx.prisma.service.findMany({
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
