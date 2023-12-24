import { extendType, objectType } from 'nexus';

export const Canale = objectType({
  name: 'Canale',
  definition(t) {
    t.string('id');
    t.string('label');
  },
});

export const GetCanali = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('canali', {
      type: Canale,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.canale.findMany();
      },
    });
  },
});
