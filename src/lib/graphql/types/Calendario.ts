import { extendType, nonNull, stringArg } from 'nexus';
import { User } from './User';
import { getErrorReturn } from '@/lib/utils';

export const CalendarioParametri = extendType({
  type: 'Query',
  definition(t) {
    t.field('calendarioParametri', {
      type: User,
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        try {
          const data = ctx.prisma.user.findUnique({
            where: { email: args.email },
            include: { boats: { include: { services: true, events: true } } },
          });
          // use schema
          return data;
        } catch (e: unknown) {
          return getErrorReturn(e);
        }
      },
    });
  },
});
