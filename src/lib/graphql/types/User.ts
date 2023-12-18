import {
  FieldResolver,
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Boat } from './Barche';
import { getErrorReturn } from '@/lib/utils';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('image');
    t.string('password');
    t.string('email', { description: 'Email of the user' });
    t.field('role', { type: Role });
    t.list.field('boats', { type: Boat });
  },
});

export const Role = enumType({
  name: 'Role',
  members: {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    COLLABORATOR: 'COLLABORATOR',
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
    t.string('message'), t.boolean('valido');
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
    return { valido: true, message: 'Utente registrato con successo' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const userAlreadyExist = e?.code === 'P2002';
    if (userAlreadyExist) {
      return {
        valido: false,
        message: userAlreadyExist
          ? 'Utente già registrato'
          : 'Qualcosa è andato storto',
      };
    }
    const error = getErrorReturn(e);
    return error;
  }
};
