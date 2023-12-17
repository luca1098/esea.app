import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Boat } from './Barche';

export const Service = objectType({
  name: 'Service',
  definition(t) {
    t.string('id');
    t.string('label');
    t.string('slug');
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
        return ctx.prisma.service.findMany({ where: { boatId: args.boatId } });
      },
    });
  },
});
