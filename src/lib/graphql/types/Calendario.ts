import { extendType, nonNull, stringArg } from 'nexus';
import { User } from './User';

export const CalendarioParametri = extendType({
  type: 'Query',
  definition(t) {
    t.field('calendarioParametri', {
      type: User,
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { email: args.email },
          include: { boats: true },
        });
      },
    });
  },
});
