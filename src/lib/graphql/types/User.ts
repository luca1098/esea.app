import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('image');
    t.string('password');
    t.string('email', { description: 'Email of the user' });
    t.field('role', { type: Role });
  },
});

export const Role = enumType({
  name: 'Role',
  members: {
    USER: 'USER',
    ADMIN: 'ADMIN',
  },
});

export const GetAllUsers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const GetUsers = extendType({
  type: 'Query',

  definition(t) {
    t.field('user', {
      type: User,
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { email: args.email },
        });
      },
    });
  },
});
