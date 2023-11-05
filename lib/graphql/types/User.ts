import { enumType, extendType, objectType, queryField } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('image');
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

// id            String    @id @default(cuid())
// name          String?
// email         String?   @unique
// emailVerified DateTime?
// image         String?
// accounts      Account[]
// sessions      Session[]
