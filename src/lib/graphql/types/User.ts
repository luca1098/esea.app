import {
  FieldResolver,
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

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

export const CreateUsers = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('user', {
      type: CreateUserResponse,
      args: { credentials: nonNull(CreateUserArgs) },
      resolve: createUserResolver,
    });
  },
});

const CreateUserArgs = inputObjectType({
  name: 'createUserArgs',
  definition(t) {
    t.nonNull.string('email'),
      t.nonNull.string('name'),
      t.nonNull.string('password');
  },
});
const CreateUserResponse = objectType({
  name: 'createUserResponse',
  definition(t) {
    t.string('message'), t.boolean('error');
  },
});

const createUserResolver: FieldResolver<'Mutation', 'CreateUsers'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.user.create({
      data: {
        ...args.credentials,
      },
    });
    return { error: false, message: 'Utente registrato con successo' };
  } catch (e: any) {
    const userAlreadyExist = e?.code === 'P2002';
    return {
      error: true,
      message: userAlreadyExist
        ? 'Utente già registrato'
        : 'Qualcosa è andato storto',
    };
  }
};
